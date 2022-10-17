const nekoClient = require('nekos.life')
const neko = new nekoClient();
const Discord = require('discord.js')

module.exports = {
	name: 'slap',
	description: 'Slap someone.',
	category: "Actions",
    args: true,
    usage: "[member]",
	async execute(client, message, args) {
        const slap = await neko.slap();
        
        let target;
        if (message.mentions.users.size) {
            target = message.mentions.members.first();
        }  else {
            target = message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.join(' ').toLowerCase() ||
                x.user.tag.toLowerCase() === args.join(' ').toLowerCase());
        }
        if (!target) return message.reply("invalid user.")

        const slapEmbed = new Discord.EmbedBuilder()
        .setTitle(`${message.author.username} slaps ${target.user.username}! Ouch.`)
        .setColor("#FCBA03")
        .setImage(slap.url)
        
        message.channel.send({embeds: [slapEmbed]})
	},
};