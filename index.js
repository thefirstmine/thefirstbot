require('dotenv').config()

const Discord = require("discord.js");
const fs = require("fs")
const { prefix } = require('./config.json')
const client = new Discord.Client({ 
      intents: ['GUILDS' , 'GUILD_MESSAGES', 'GUILD_PRESENCES', 'GUILD_BANS'],
   });

//Custom Prefix handler
const prefixSchema = require('./models/prefix')

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
  if (excChannel) logsEmbed.addField("Where they deleted messages", excChannel) //excChannel

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
    // await client.applications.commands.set() //for use for global use (1 hour caching process)
    const slashFolders = await globPromise(`${process.cwd()}/SlashCommands/*/*.js`);
  
    const arrayOfSlashCommands = [];
    
    slashFolders.map((value) => {
      const file = require(value);
      if(!file?.name) return;
    
      client.slashCommands.set(file.name, file);
      arrayOfSlashCommands.push(file)
    });
    await client.guilds.cache.get('856412585862496266').commands.set(arrayOfSlashCommands)

    client.user.setActivity('t!help', { type: 'LISTENING' });
    console.log(`Logged in as ${client.user.tag}!`);
  });

client.on('interactionCreate', async interaction => {
  if(interaction.isCommand()) {
    await interaction.defer().catch( (error) => {console.error(error)} );

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