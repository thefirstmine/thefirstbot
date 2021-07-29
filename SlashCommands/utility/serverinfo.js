const Discord = require('discord.js');
const { CommandInteraction, Client } = require('discord.js');

module.exports = {
    name: "serverinfo",
    description: "Check the info of the server!",

    run: async(client, interaction, args) => {

        const owner = interaction.guild.members.cache.get(interaction.guild.ownerId)

        const embed = new Discord.MessageEmbed()
        .setTitle(interaction.guild.name)
        .setThumbnail(interaction.guild.iconURL({dynamic: true}))
        .setDescription('Server Info!')
        .addField('Server ID', `${interaction.guild.id}`)
        .addField('Server Owner', `${owner.user.tag}`)
        .addField('You joined at', `${interaction.member.joinedAt}`)
        .addField('Created at', `${interaction.guild.createdAt}`)
        .setColor('#fcba03')

        interaction.editReply({embeds: [embed]})
    }
}