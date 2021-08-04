const Discord = require("discord.js")

module.exports = {
	name: 'lockdown',
	description: 'Lockdown a channel from anyone sending messages',
    category: "Moderation",
    aliases: ['lock'],
	async execute(client, message, args) {
        if (!message.member.permissionsIn(message.channel).toArray().includes('MANAGE_ROLES')) return message.reply("You can't manage this channels permissions!")
        if (!message.guild.me.permissionsIn(message.channel).toArray().includes('MANAGE_ROLES')) return message.reply("I can't manage this channels permissions!")

        if(!message.channel.permissionOverwrites.cache.get(message.guild.roles.everyone.id).deny.toArray().includes('SEND_MESSAGES')){
            message.channel.permissionOverwrites.edit(message.client.user, {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true
            })
            .then(message.channel.permissionOverwrites.edit(message.guild.roles.everyone.id, {
                SEND_MESSAGES: false,
            }))
            .then(message.channel.permissionOverwrites.edit(message.author.id, {
                SEND_MESSAGES: true,
            }))
            message.channel.send("✅ Channel locked down until further notice. Use this command again to unlockdown!")
            client.modlogs({
                Action: "A channel was locked!",
                excChannel: message.channel,
                Moderator: message.author.tag,
                Color: "RED"
            }, message)
        } else {
            message.channel.permissionOverwrites.edit(message.guild.roles.everyone.id, {
                SEND_MESSAGES: true,
            })
            .then(message.channel.send("✅ Channel unlocked."))
            client.modlogs({
                Action: "A channel was unlocked!",
                excChannel: message.channel,
                Moderator: message.author.tag,
                Color: "GREEN"
            }, message)
         }
        
	},
};