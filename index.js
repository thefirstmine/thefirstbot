require('dotenv').config()

const Discord = require("discord.js");
const fs = require("fs")
const { prefix } = require('./config.json')
const client = new Discord.Client({ 
      intents: ['GUILDS' , 'GUILD_MESSAGES', 'GUILD_PRESENCES', 'GUILD_BANS', 'GUILD_VOICE_STATES'],
   });

// Custom Prefix handler
const prefixSchema = require('./models/prefix')

// Error handling
const errorWebhook = new Discord.WebhookClient({url: `${process.env.ERROR_WEBHOOK_URL}`})

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
  errorWebhook.send({
    content: `Unhandled Rejection at:\`\`\`\n${reason.stack || reason}\`\`\``,
    username: `${client.user.username}`,
    avatarURL: `${client.user.avatarURL({size: 1024})}`,
    split: true
  })
})
process.on('uncaughtException', (err, origin) => {
  console.log(err, origin)
  errorWebhook.send({
    content: `Uncaught Exception at:\`\`\`\n${err}\n${origin}\`\`\``,
    username: `${client.user.username}`,
    avatarURL: `${client.user.avatarURL({size: 1024})}`,
    split: true
  })
})

// Distube Initialization
const Distube = require('distube')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { SpotifyPlugin } = require('@distube/spotify')
client.distube = new Distube.default(client, {
  searchSongs: 1,
	searchCooldown: 10,
	leaveOnEmpty: true,
	emptyCooldown: 10,
	leaveOnFinish: true,
	leaveOnStop: true,
	plugins: [new SoundCloudPlugin(), new SpotifyPlugin({
    emitEventsAfterFetching: true,
    api:{
      clientId: process.env.SPOTIFY_CLIENTID,
      clientSecret: process.env.SPOTIFY_CLIENTSECRET
    }
  })],
})

const status = queue =>
  `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ')
  || 'Off'}\` | Loop: \`${queue.repeatMode
    ? queue.repeatMode === 2
      ? 'All Queue'
      : 'This Song'
    : 'Off'
  }\``

const eventEmbed = new Discord.MessageEmbed()
.setColor("#FCBA03")

client.distube.on('playSong', (queue, song) => {
  eventEmbed.setDescription(`Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`)
  queue.textChannel.send({embeds: [eventEmbed]})
  }).on('addSong', (queue, song) => {
    eventEmbed.setDescription(`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`)
    queue.textChannel.send({embeds: [eventEmbed]})
  })
  .on('addList', (queue, playlist) => {
    eventEmbed.setDescription(`Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`)
    queue.textChannel.send({embeds: [eventEmbed]})
  })
  /*.on('searchResult', (message, result) => {
    let i = 0
    message.channel.send(
      `**Choose an option from below**\n${result
        .map(
          song =>
            `**${++i}**. ${song.name} - \`${song.formattedDuration
            }\``,
        )
        .join(
          '\n',
        )}\n*Enter anything else or wait 30 seconds to cancel*`,
    )
  })
  .on('searchCancel', message => message.channel.send(`Searching canceled`))
  .on('searchInvalidAnswer', message =>
    message.channel.send(`searchInvalidAnswer`))
  .on('searchNoResult', message => message.channel.send(`No result found!`))*/
  .on('error', (textChannel, e) => {
    console.error(e)
    textChannel.send({content: `An error has occured! \`\`\`${e}\`\`\``, split: true})
  })

// Mongoose initialization
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB,{
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(console.log("Connected to MongoDB!"))
  .catch(console.error())

// Modlogs embed structure
const modlogsSchema = require('./models/modlogs')
client.modlogs = async function({ Member, Action, Color, Reason, Moderator, Count, excChannel }, message) {
  const data = await modlogsSchema.findOne({ Guild: message.guild.id });
  if (!data) return;
  
  const channel = message.guild.channels.cache.get(data.Channel);
  const logsEmbed = new Discord.MessageEmbed()
  .setTitle(Action)
  .setColor(Color)
  .setDescription(`Reason: ${Reason || 'No reason was provided!'}`)
  .addField("Moderator:", Moderator)

  if (Member) logsEmbed.addField("Member that was tooked action on", `${Member.user.tag} (${Member.id})`)
  if (Count) logsEmbed.addField("Count of messages that was deleted", Count.toString()) // Count
  if (excChannel) logsEmbed.addField("Channel where it was executed", excChannel.toString()) //excChannel

  channel.send({embeds: [logsEmbed]})
}

// Command Handler
const { glob } = require('glob')
const { promisify } = require('util')
const globPromise = promisify(glob)

client.commands = new Discord.Collection();
client.slashCommands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.on('ready', async () => {
  const slashFolders = await globPromise(`${process.cwd()}/SlashCommands/*/*.js`);
  
  const arrayOfSlashCommands = [];
  
  slashFolders.map((value) => {
    const file = require(value);
    if(!file?.name) return;
    
    client.slashCommands.set(file.name, file);
    arrayOfSlashCommands.push(file)
  });
     await client.application?.commands.set(arrayOfSlashCommands) //for use for global use (1 hour caching process)
  
    //await client.guilds.cache.get('560339741602480128').commands.set(arrayOfSlashCommands) //UNCOMMENT IF TESTING FOR DEVELOPMENT
    //await client.guilds.cache.get('856412585862496266').commands.set(arrayOfSlashCommands)

    client.user.setActivity('t!help', { type: 'LISTENING' });
    console.log(`Logged in as ${client.user.tag}!`);
  });

client.on('interactionCreate', async interaction => {
  if(interaction.isCommand()) {
    await interaction.deferReply().catch( () => {} );

    const cmd = client.slashCommands.get(interaction.commandName);
    if(!cmd) return interaction.followUp({content: 'An error has occured'});

    const args = [];
    interaction.options.data.map((x) => {
      args.push(x.value);
    })
    cmd.run(client, interaction, args);
  }
})

client.on('messageCreate', async message => {

  if (message.author.bot || message.channel.type === 'dm') return;

  const fetchprefix = (await prefixSchema.findOne({
    guildID: message.guild.id
  }))?.prefix ?? "t!"
  client.prefix = fetchprefix

  if (message.content.includes(`<@!${client.user.id}>`)){
    if (fetchprefix === prefix){
      message.reply(`My global prefix is \`${prefix}\``)
    } else {
      message.reply(
        `My global prefix is \`${prefix}\` and this servers prefix is \`${fetchprefix}\``
      )
    }
  }

  const prefixRegex = new RegExp(
    `^(${prefix}|${fetchprefix})\\s*`
  );
  
  if (prefixRegex.test(message.content)){
  
    const [, matchedPrefix] = message.content.match(prefixRegex);

    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
      || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if(command.ownerOnly && message.member.id !== process.env.OWNER_ID) return;

    if (command.voiceOnly && !message.member.voice.channel) {
      let reply = "You need to be in a voice channel to execute this!"
      message.reply({content: `${reply}`})
    } else if (command.voiceOnly && !message.member.voice.channel.joinable) {
      message.reply("I can't join this voice channel!")
    }

    if (command.args && !args.length) {
      let reply = `You didn't provide any arguments, ${message.author}!`;
    
      if (command.usage) {
        reply += `\nThe proper usage would be: \`${fetchprefix}${command.name} ${command.usage}\``;
      }
    
      return message.channel.send(reply);
    }

    try {
      command.execute(client, message, args);
    } catch (error) {
      console.error(error);
      message.reply('There was an error trying to execute that command!');
    }
}

})
client.login(process.env.TOKEN)