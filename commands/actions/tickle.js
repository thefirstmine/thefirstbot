const nekoClient = require('nekos.life')
const neko = new nekoClient();
const Discord = require('discord.js')

module.exports = {
	name: 'tickle',
	description: 'Tickle someone!',
	category: "Actions",
    args: true,
    usage: "[member]",
	async execute(client, message, args) {
        const tickle = await neko.tickle();
        
        let target;
        if (message.mentions.users.size) {
            target = message.mentions.members.first();
        }  else {
            target = message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.join(' ').toLowerCase() ||
                x.user.tag.toLowerCase() === args.join(' ').toLowerCase());
        }
        if (!target) return message.reply("invalid user.")

        const tickleEmbed = new Discord.EmbedBuilder()
        .setTitle(`${message.author.username} tickles ${target.user.username}!`)
        .setColor("#FCBA03")
        .setImage(tickle.url)
        
        message.channel.send({embeds: [tickleEmbed]})
	},
};