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
    },
   });

//Custom Prefix handler
const mongopref = require("discord-mongodb-prefix");
mongopref.setURL(process.env.MONGODB);
mongopref.setDefaultPrefix(prefix);

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
  const fetchprefix = await mongopref.fetch(message.guild.id);
  
  if (message.content.includes(`<@!${client.user.id}>`)){
    if (fetchprefix.prefix === prefix){
      message.reply(`My global prefix is \`${prefix}\``)
    } else {
      message.reply(
        `My global prefix is \`${prefix}\` and this servers prefix is \`${fetchprefix.prefix}\``
      )
    }
  }

  const prefixRegex = new RegExp(
    `^(${prefix}|${fetchprefix.prefix})\\s*`
  );
  
  if (prefixRegex.test(message.content)){
    if (message.author.bot || message.channel.type === 'dm') return;
  
    const [, matchedPrefix] = message.content.match(prefixRegex);

    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
      || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.args && !args.length) {
      let reply = `You didn't provide any arguments, ${message.author}!`;
    
      if (command.usage) {
        reply += `\nThe proper usage would be: \`${fetchprefix.prefix}${command.name} ${command.usage}\``;
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