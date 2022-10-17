const nekoClient = require('nekos.life')
const neko = new nekoClient();
const Discord = require('discord.js')

module.exports = {
	name: 'pat',
	description: 'Pat someone!',
	category: "Actions",
    args: true,
    usage: "[member]",
	async execute(client, message, args) {
        const pat = await neko.pat();
        
        let target;
        if (message.mentions.users.size) {
            target = message.mentions.members.first();
        }  else {
            target = message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.join(' ').toLowerCase() ||
                x.user.tag.toLowerCase() === args.join(' ').toLowerCase());
        }
        if (!target) return message.reply("invalid user.")

        const patEmbed = new Discord.EmbedBuilder()
        .setTitle(`${message.author.username} pats ${target.user.username}!`)
        .setColor("#FCBA03")
        .setImage(pat.url)
        
        message.channel.send({embeds: [patEmbed]})
	},
};