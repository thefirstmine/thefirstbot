const Discord = require("discord.js");
const fs = require("fs")
const { prefix, token } = require('./config.json')
const client = new Discord.Client({
    presence: {
     status: 'online',
     activity: {
      name: 't!help | Finally back for a fresh restart!',
      type: 'PLAYING',
     },
    },
   });

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

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot || message.channel.type === 'dm') return;

	const args = message.content.slice(prefix.length).trim().split(' ');
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)

	if (!command) return;

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;
  
    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }
  
    return message.channel.send(reply);
  }

  try {
    command.execute(client, message, args);
} catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
}

})
client.login(token)