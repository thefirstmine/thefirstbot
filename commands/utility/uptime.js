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
        .setDescription(`${uptime}\n\nHeroku dynos restart once every 24 hours, so you can\'t see the timer go up 1 day, you can read it about [here](https://devcenter.heroku.com/articles/dynos#restarting)`)
        .setColor("#FCBA03")
        message.channel.send(uptimeEmbed)
	},
};