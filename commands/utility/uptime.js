const Discord = require("discord.js")

module.exports = {
	name: 'uptime',
	description: 'Check bot uptime.',
        category: "Utility",
	execute(client, message, args) {
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
	},
};