const Discord = require("discord.js")

module.exports = {
	name: 'purge',
	description: 'Bulk delete messages',
    category: "Moderation",
    args: true,
    usage: "[number of messages]",
	async execute(client, message, args) {
        if (!message.guild.me.permissions.has("MANAGE_MESSAGES")) return message.reply("I can't manage messages! Contact your server admin to give me the `MANAGE_MESSAGES` permission.")
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply("you can't manage messages!")

        const deleteCount = parseInt(args[0])
        if (isNaN(deleteCount)) return message.reply("enter a valid number!")
        if (deleteCount < 2 || deleteCount > 100) return message.reply("you can only delete 2 messages up to 100!")

        const fetched = await message.channel.messages.fetch({limit: deleteCount})
        
        message.channel.bulkDelete(fetched)
        .catch(error => message.reply("there was an error trying to delete messages! Error: ```" + error + "```"))
        
        client.modlogs({
            Action: "Purged messages!",
            Moderator: message.author.tag,
            Color: "#FCBA03",
            Count: deleteCount,
            excChannel: message.channel
        }, message)

        const confirmMessage = await message.reply(`deleted ${deleteCount} messages.`)
        setTimeout(() => confirmMessage.delete(), 3000);
	},
};