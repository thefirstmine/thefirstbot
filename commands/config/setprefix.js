const Discord = require("discord.js")
const Schema = require('../../models/prefix')

module.exports = {
	name: 'setprefix',
	description: 'Set a custom prefix for the server!',
    category: "Config",
	args: true,
	usage: "[new prefix]",
	async execute(client, message, args) {
		if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply("you can't configure this! You need the `ADMINISTRATOR` permission to configure this.")

		const newprefix = args[0]
		if (newprefix === "\u005c") return message.reply("you can\'t use that as a prefix for technical reasons.")
		Schema.findOne({ guildID: message.guild.id }, async (err, data) => {
            if(data) data.delete();
            new Schema({
                guildID: message.guild.id,
                prefix: args[0],
            }).save();
            message.channel.send(`**Successfully change prefix from "${client.prefix}" to "${newprefix}"**`)
        })
	},
};