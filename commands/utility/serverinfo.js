
const Discord = require("discord.js")

module.exports = {
    name: 'serverinfo',
	description: 'Check info about the server!',
    category: "Utility",
	async execute (client, message, args) {
        const owner = message.guild.members.cache.get(message.guild.ownerId)

        const embed = new Discord.EmbedBuilder()
        .setTitle(message.guild.name)
        .setThumbnail(message.guild.iconURL({dynamic: true}))
        .setDescription('Server Info!')
        .addField('Server ID', `${message.guild.id}`)
        .addField('Server Owner', `${owner.user.tag}`)
        .addField('You joined at', `${message.member.joinedAt}`)
        .addField('Created at', `${message.guild.createdAt}`)
        .setColor('#fcba03')
        message.channel.send({embeds: [embed]})

	},
};