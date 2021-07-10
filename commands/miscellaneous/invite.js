const Discord = require("discord.js")

module.exports = {
	name: 'invite',
	description: 'Invite the bot to your own servers!s',
    category: "Miscellaneous",
	execute(client, message, args) {
        const inviteEmbed = new Discord.MessageEmbed()
        .setTitle("Invite the bot!")
        .setDescription("Invite the bot here!\n\n[Invite](https://discord.com/oauth2/authorize?client_id=595513926523944973&permissions=3691375863&scope=bot)")
        .setColor("#FCBA03")
        .setThumbnail("https://cdn.discordapp.com/attachments/856788504297078814/861179931718844446/thefirstbot.png")
        
        message.author.send(inviteEmbed)
        .then(message.reply("I've sent it in your DM's!"))
        .catch(error => {
            message.reply('it seems like I can\'t DM you!');
        });
	},
};