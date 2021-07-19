
const Discord = require("discord.js")

module.exports = {
    name: 'serverinfo',
	description: 'Check info about the server!',
    category: "Utility",
	async execute (client, message, args) {
        const embed = new Discord.MessageEmbed()
        .setTitle(message.guild.name)
        .setThumbnail(message.guild.iconURL())
        .setDescription('Server Info!')
        .addField('Server ID', message.guild.id)
        .addField('Server Owner', message.guild.owner)
        .addField('Server Region', message.guild.region)
        .addField('You joined at', message.member.joinedAt)
        .addField('Created at', message.guild.createdAt)
        .setColor('#fcba03')
        message.channel.send(embed)

	},
};