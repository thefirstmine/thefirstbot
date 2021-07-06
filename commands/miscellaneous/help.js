const Discord = require("discord.js")
const { prefix } = require("../../config.json")

module.exports = {
	name: 'help',
	description: 'Help command, check the commands, or whatever',
        category: "Miscellaneous",
        usage: "<command name>",
	execute(client, message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
                        
                        const funCmd = commands.filter(c => c.category == "Fun")
                        const miscCmd = commands.filter(c => c.category == "Miscellaneous")
                        const modCmd = commands.filter(c => c.category == "Moderation")
                        const utilityCmd = commands.filter(c => c.category == "Utility")
                        
                        const helpEmbed = new Discord.MessageEmbed()
                        .setTitle("Here's a list of all my commands!")
                        .setDescription(`You can send \`${prefix}help [command name]\` to get info on a specific command!`)
                        .addField("🤡 Fun", funCmd.map(cmd => cmd.name).join(', '))
                        .addField("🛠 Moderation", modCmd.map(cmd => cmd.name).join(', '))
                        .addField("🔧 Utility", utilityCmd.map(cmd => cmd.name).join(', '))
                        .addField("🦀 Miscellaneous", miscCmd.map(cmd => cmd.name).join(', '))
                        .setColor("#FCBA03")
                        .setFooter("`[]` means required and `<>` means optional.")

			return message.author.send(helpEmbed)
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('I\'ve sent you a DM with all my commands!');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply('it seems like I can\'t DM you!');
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
                if (command.category) data.push(`**Category:** ${command.category}`)
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

		message.channel.send(data, { split: true });
	}, 
};