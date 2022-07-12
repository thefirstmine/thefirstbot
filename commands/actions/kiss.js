const nekoClient = require('nekos.life')
const neko = new nekoClient();
const Discord = require('discord.js')

module.exports = {
	name: 'kiss',
	description: 'Kiss someone!😳',
	category: "Actions",
    args: true,
    usage: "[member]",
	async execute(client, message, args) {
        const kiss = await neko.kiss();
        
        let target;
        if (message.mentions.users.size) {
            target = message.mentions.members.first();
        }  else {
            target = message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.join(' ').toLowerCase() ||
                x.user.tag.toLowerCase() === args.join(' ').toLowerCase());
        }
        if (!target) return message.reply("invalid user.")

        const kissEmbed = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} kisses ${target.user.username}! 😳`)
        .setColor("#FCBA03")
        .setImage(kiss.url)
        
        message.channel.send({embeds: [kissEmbed]})
	},
};