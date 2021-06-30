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

    //Start of commands

    //Start of Utility commands
    if (command === 'ping') {
        message.channel.send(`🏓 Pong! ${Date.now() - message.createdTimestamp}ms.`)
    } else if (command === 'uptime') {
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let uptime = `${days} days, ${hours} hours, and ${minutes} minutes`;

        const uptimeEmbed = new Discord.MessageEmbed()
        .setTitle("<:uptime:859760884007436309> Bot uptime")
        .setDescription(uptime)
        .setColor("#FCBA03")
        message.channel.send(uptimeEmbed)
        // Start of Fun commands
    } else if (command === 'flip') {
        function randomFlip(){
            const flip = ['Heads.', 'Tails.'];
            return flip[Math.floor(Math.random()*flip.length)];
        }
        message.reply(`Flip! I call ${randomFlip()}`)
    } else if (command === 'help') {
        const helpEmbed = new Discord.MessageEmbed()
        .setTitle("TheFirstBot | Command list")
        .addField("🤡 Fun", "`flip`")
        .addField("🔧 Utilities", "`ping`, `uptime`")
        .setColor("#FCBA03")
        .setFooter("Developed by TheFirstMine_PH#6062")
        message.channel.send(helpEmbed)
    }

})
client.login(token)