const Discord = require("discord.js")
const { prefix } = require("../../config.json")

module.exports = {
	name: 'help',
	description: 'Help command, check the commands, or whatever',
        category: "Miscellaneous",
        usage: "<command name>",
	execute(client, message, args) {
		const { commands } = message.client;

		if (!args.length) {
                        
                        const funCmd = commands.filter(c => c.category == "Fun")
                        const miscCmd = commands.filter(c => c.category == "Miscellaneous")
                        const modCmd = commands.filter(c => c.category == "Moderation")
                        const utilityCmd = commands.filter(c => c.category == "Utility")
                        const actionCmd = commands.filter(c => c.category == "Actions")
						const configCmd = commands.filter(c => c.category === "Config")
                        
                        const helpEmbed = new Discord.MessageEmbed()
                        .setTitle("Here's a list of all my commands!")
                        .setDescription(`You can send \`${prefix}help [command name]\` to get info on a specific command!`)
                        .addField("🤡 Fun", funCmd.map(cmd => cmd.name).join(', '))
                        .addField("🛠 Moderation", modCmd.map(cmd => cmd.name).join(', '))
                        .addField("🔧 Utility", utilityCmd.map(cmd => cmd.name).join(', '))
						.addField("⚙ Configuration", configCmd.map(cmd => cmd.name).join(', '))
                        .addField("🦀 Miscellaneous", miscCmd.map(cmd => cmd.name).join(', '))
						.addField("🎬 Actions", actionCmd.map(cmd => cmd.name).join(', '))
                        .setColor("#FCBA03")
                        .setFooter("`[]` means required and `<>` means optional.")

			return message.author.send({embeds: [helpEmbed]})
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply({content: 'I\'ve sent you a DM with all my commands!'});
				})
				.catch(error => {
					message.reply({content: 'It seems like I can\'t DM you!'});
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply({content: 'That\'s not a valid command!'});
		}

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