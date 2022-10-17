const Discord = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: "avatar",
    description: "Check your/someone elses avatar!",
    options: [
        {
            name: 'user',
            description: 'Check someone elses avatar! Otherwise leave blank.',
            type: 'USER',
            required: false
        }
    ],
    run: async(client, interaction, args) => {
        let [user] = args;
        let target;
        
        if (!user) {
            target = interaction.member
        } else {
            target = interaction.guild.members.cache.get(user)
        }
        const avatarEmbed = new Discord.EmbedBuilder()
        .setTitle(`${target.user.username}\'s avatar!`)
        .setImage(target.user.avatarURL({dynamic: true, size: 1024}))
        .setColor("#FCBA03")

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setLabel('Default Link')
                .setStyle('LINK')
                .setURL(`${target.user.avatarURL({dynamic: true, size: 1024})}`),
            new MessageButton()
                .setLabel('.webp')
                .setStyle('LINK')
                .setURL(`${target.user.avatarURL({format: "webp", size: 1024})}`),
            new MessageButton()
                .setLabel('.png')
                .setStyle('LINK')
                .setURL(`${target.user.avatarURL({format: "png", size: 1024})}`),
            new MessageButton()
                .setLabel('.jpg')
                .setStyle('LINK')
                .setURL(`${target.user.avatarURL({format: "jpg", size: 1024})}`),
        );

        interaction.editReply({embeds: [avatarEmbed], components: [row]})
    }
}