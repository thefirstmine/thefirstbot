const Discord = require("discord.js")
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	name: 'invite',
	description: 'Invite the bot to your own servers!s',
    category: "Miscellaneous",
	execute(client, message, args) {
        const inviteEmbed = new Discord.MessageEmbed()
        .setTitle("Invite the bot!")
        .setColor("#FCBA03")
        .setThumbnail("https://cdn.discordapp.com/attachments/856788504297078814/861179931718844446/thefirstbot.png")

        const row = new MessageActionRow()
					.addComponents(
						new MessageButton()
							.setLabel('Invite me!')
							.setStyle('LINK')
							.setEmoji('🤖')
							.setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=261926808822&scope=bot%20applications.commands`),
					);
        
        message.author.send({embeds: [inviteEmbed], components: [row]})
        .then(message.reply({content: "I've sent it in your DM's!"}))
        .catch(error => {
            message.reply({content: 'It seems like I can\'t DM you!'});
        });
	},
};