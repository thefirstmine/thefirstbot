const Discord = require('discord.js');
const { CommandInteraction, Client} = require('discord.js');

module.exports = {
    name: "userinfo",
    description: "Check the info of member! Or check your own.",
    options: [
        {
            name: 'user',
            description: 'Check someone elses info! Otherwise leave blank.',
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

        let statusEmoji;
        if (target.presence === null){
            statusEmoji = '<:offline:865218362560872469>'
        } else if (target.presence.status === 'idle'){
            statusEmoji = '<:idle:865218105650577468>'
        } else if(target.presence.status === 'dnd'){
            statusEmoji = '<:dnd:865218105277808672>'
        } else if(target.presence.status === 'online'){
            statusEmoji = '<:online:865218105353306133>'
        }


        const userEmbed = new Discord.MessageEmbed()
        .setTitle("User info")
        .setDescription(statusEmoji)
        .addField("Username and tag:", `${target.user.tag}`)
        .addField("User ID:", `${target.user.id}`)
        .addField("Joined this server at:", `${target.joinedAt}`)
        .addField("Joined Discord at:", `${target.user.createdAt}`)
        .addField("Roles:", `${target.roles.cache.map(role => role.name).join(' , ')}`)
        .setThumbnail(target.user.displayAvatarURL({dynamic: true}))
        .setColor("#FCBA03")

        interaction.editReply({embeds: [userEmbed]})
    }
}