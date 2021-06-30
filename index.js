// made while 2 programmers arguing in a vc
const Discord = require("discord.js");
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

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();

    if (command === 'ping'){
        message.channel.send(`🏓 Pong! ${Date.now() - message.createdTimestamp}ms.`)
    } 

})
client.login(token)