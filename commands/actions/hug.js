const nekoClient = require('nekos.life')
const neko = new nekoClient();
const Discord = require('discord.js')

module.exports = {
	name: 'hug',
	description: 'Hug someone!',
	category: "Actions",
    args: true,
    usage: "[member]",
	async execute(client, message, args) {
        const hug = await neko.sfw.hug();
        
        let target;
        if (message.mentions.users.size) {
            target = message.mentions.members.first();
        }  else {
            target = message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.join(' ').toLowerCase() ||
                x.user.tag.toLowerCase() === args.join(' ').toLowerCase());
        }
        if (!target) return message.reply("invalid user.")

        const hugEmbed = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} hugs ${target.user.username}! Aww`)
        .setColor("#FCBA03")
        .setImage(hug.url)
        
        message.channel.send(hugEmbed)
	},
};