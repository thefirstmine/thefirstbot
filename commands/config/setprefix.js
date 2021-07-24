const Discord = require("discord.js")
const mongopref = require("discord-mongodb-prefix");
mongopref.setURL(process.env.MONGODB); 

module.exports = {
	name: 'setprefix',
	description: 'Set a custom prefix for the server!',
    category: "Config",
	args: true,
	usage: "[new prefix]",
	async execute(client, message, args) {
		if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply("you can't configure this!")
		const fetchprefix = await mongopref.fetch(message.guild.id);

		const newprefix = args[0]
		if (newprefix === "\u005c") return message.reply("you can\'t use that as a prefix for technical reasons.")
		await mongopref.changeprefix(message.guild.id, newprefix); 
		return message.channel.send(`**Successfully change prefix from "${fetchprefix.prefix}" to "${newprefix}"**`)
	},
};