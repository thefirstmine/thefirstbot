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

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(client, message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}

})
client.login(token)