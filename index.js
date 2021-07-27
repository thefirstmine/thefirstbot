require('dotenv').config()

const Discord = require("discord.js");
const fs = require("fs")
const { prefix } = require('./config.json')
const client = new Discord.Client({
    presence: {
     status: 'online',
     activity: {
      name: 't!help',
      type: 'LISTENING',
     },
    },ws: {
      intents: ['GUILDS' , 'GUILD_MESSAGES', 'GUILD_PRESENCES', 'GUILD_BANS']
    },
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
  if (Count) logsEmbed.addField("Count of messages that was deleted", Count)
  if (excChannel) logsEmbed.addField("Where they deleted messages", excChannel)

  channel.send(logsEmbed)
}

// Command Handler
client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

client.on('message', async message => {

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
      message.reply('there was an error trying to execute that command!');
    }
}

})
client.login(process.env.TOKEN)