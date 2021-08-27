const Discord = require("discord.js")
const { MessageActionRow, MessageButton } = require('discord.js');
const { prefix } = require("../../config.json")

module.exports = {
	name: 'help',
	description: 'Help command, check the commands, or whatever',
        category: "Miscellaneous",
        usage: "<command name>",
	execute(client, message, args) {
		const { commands } = message.client;

		if (!args.length) {

			const category = function ({ Category }) {
				const filter = commands.filter(c => c.category === Category)
				return filter.map(c => c.name).join(', ');
			}
			
			const helpEmbed = new Discord.MessageEmbed()
			.setTitle("Here's a list of all my commands!")
			.setDescription(`You can send \`${prefix}help [command name]\` to get info on a specific command!`)
			.addField("🤡 Fun", `${category({Category: "Fun"})}`)
			.addField("🛠 Moderation", `${category({Category: "Moderation"})}`)
			.addField("🔧 Utility", `${category({Category: "Utility"})}`)
			.addField("⚙ Configuration", `${category({Category: "Config"})}`)
			.addField("🦀 Miscellaneous", `${category({Category: "Miscellaneous"})}`)
			.addField("🎬 Actions", `${category({Category: "Actions"})}`)
			.addField("🎵 Music", `${category({Category: "Music"})}`)
			.setColor("#FCBA03")
			.setFooter("`[]` means required and `<>` means optional.")

			const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel('Invite me!')
					.setStyle('LINK')
					.setEmoji('🤖')
					.setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=261926808822&scope=bot%20applications.commands`),
				new MessageButton()
					.setLabel('Support server.')
					.setStyle('LINK')
					.setEmoji('❗')
					.setURL('https://discord.gg/T8UhYVNEs2'),
			);

			return message.author.send({embeds: [helpEmbed], components: [row]})
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply({content: 'I\'ve sent you a DM with all my commands!'});
				})
				.catch(error => {
					console.error(error)
					message.reply({content: 'It seems like I can\'t DM you!'});
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply({content: 'That\'s not a valid command!'});
		}

		if(command.category === "Owner" && message.member.id !== process.env.OWNER_ID) return message.reply({content: 'That\'s not a valid command!'});

		const embed = new Discord.MessageEmbed()
		.setTitle(`**Name:** ${command.name}`)
		.setColor("#FCBA03")

		if (command.aliases) embed.addField(`**Aliases:** `, `${command.aliases.join(', ')}`);
		if (command.description) embed.addField(`**Description:** `, `${command.description}`);
        if (command.category) embed.addField(`**Category:** `, `${command.category}`)
		if (command.usage) embed.addField(`**Usage:** `, `${prefix}${command.name} ${command.usage}`)

		message.channel.send({embeds: [embed]});
	}, 
};