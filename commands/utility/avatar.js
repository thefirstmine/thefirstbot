const Discord = require("discord.js")

module.exports = {
	name: 'avatar',
	description: 'Get someones profile picture!',
    category: "Utility",
    aliases: ['pfp'],
	execute(client, message, args) {
        if(!args.length){
            target = message.guild.members.cache.get(message.author.id)
        } else if (message.mentions.users.size) {
            target = message.mentions.members.first();
        } else if (args[0].match(/^([0-9]{15,21})$/)) {
            target = message.guild.members.cache.get(args[0]);
        } else {
            target = message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.join(' ').toLowerCase() ||
                x.user.tag.toLowerCase() === args.join(' ').toLowerCase());
        }
        if (!target) return message.reply("invalid user.")

        const avatarEmbed = new Discord.MessageEmbed()
        .setTitle(`${target.user.username}\'s avatar!`)
        .setDescription(
        `[Default link](${target.user.avatarURL({dynamic: true, size: 1024})})\nOther image formats:\n[.webp](${target.user.avatarURL({format: "webp", size: 1024})}) | [.png](${target.user.avatarURL({format: "png", size: 1024})}) | [.jpg](${target.user.avatarURL({format: "jpg", size: 1024})})`
        )
        .setImage(target.user.avatarURL({dynamic: true, size: 1024}))
        .setColor("#FCBA03")

        message.channel.send({embeds: [avatarEmbed]})
	},
};