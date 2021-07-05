const Discord = require("discord.js")

module.exports = {
	name: 'help',
	description: 'Help command, check the commands, or whatever',
	execute(client, message, args) {
        const helpEmbed = new Discord.MessageEmbed()
        .setTitle("TheFirstBot | Command list")
        .addField("🤡 Fun", "`flip`")
        .addField("🛠 Moderation", "`kick`, `ban`")
        .addField("🔧 Utilities", "`ping`, `uptime`")
        .addField("🦀 Miscellaneous", "`about`")
        .setColor("#FCBA03")
        .setFooter("Developed by TheFirstMine_PH#6062")
        message.channel.send(helpEmbed)
	},
};