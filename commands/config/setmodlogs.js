const Discord = require("discord.js")
const Schema = require('../../models/modlogs')

module.exports = {
	name: 'setmodlogs',
	description: 'Set a moderation logging channel for the server!',
    category: "Config",
	args: true,
	usage: "[channel]",
    aliases: ['set-logs'],
	async execute(client, message, args) {
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply("you can't configure this! You need the `ADMINISTRATOR` permission to configure this.")

        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if(!channel.permissionsFor(client.user.id).has("VIEW_CHANNEL")) return message.reply("I can't access that channel!")

        Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
            if(data) data.delete();
            new Schema({
                Guild: message.guild.id,
                Channel: channel.id,
            }).save();
            message.channel.send(`${channel} has been set as the channel for logging moderation commands!`)
        })
	},
};