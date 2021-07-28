const Discord = require("discord.js")

module.exports = {
	name: 'about',
	description: 'About the bot and the developer',
        category: "Miscellaneous",
	execute(client, message, args) {
        const aboutEmbed = new Discord.MessageEmbed()
        .setTitle("About")
        .setDescription("Originally developed in 2018, revived in 2021, made by TheFirstMine_PH#6062.\n\n[GitHub source code](https://github.com/thefirstmine/thefirstbot)")
        .setColor("#FCBA03")
        .setThumbnail("https://cdn.discordapp.com/attachments/856788504297078814/861179931718844446/thefirstbot.png")
        
        message.channel.send({embeds: [aboutEmbed]})
	},
};