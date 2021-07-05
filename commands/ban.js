const Discord = require("discord.js")

module.exports = {
	name: 'ban',
	description: 'Ban a member.',
	async execute (client, message, args) {
        if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply("I can't ban members! Contact your server admin to give me the `BAN_MEMBERS` permission.")
        if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply("you can't ban members!")

        if (!args.length) return message.reply("mention a user or put a user ID!")
        let target;
        if (message.mentions.users.size) {
            target = message.mentions.members.first();
        } else if (args[0].match(/^([0-9]{15,21})$/)) {
            target = message.guild.members.cache.get(args[0]);
        } else {
            target = message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.join(' ').toLowerCase() ||
                x.user.tag.toLowerCase() === args.join(' ').toLowerCase());
        }
        if (!target) return message.reply("invalid user.")
        if (target === message.author.username || message.author.id || message.author.username) return message.reply("you can't ban yourself!")

        let reason2 = args.slice(1).join(' ')
        let reason = `Banned by ${message.author.tag} with reason "${args.slice(1).join(' ')}"`

        if(!reason2){ 
            reason = `Banned by ${message.author.tag} with no reason provided.`
        }

        message.guild.members.ban(target, { reason }) 

        message.channel.send(`Successfully banned ${target}.`)
	},
};