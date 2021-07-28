const Discord = require("discord.js")

module.exports = {
	name: 'kick',
	description: 'Kick a member.',
    args: true,
    usage: "[member] <reason>",
    category: "Moderation",
	async execute (client, message, args) {
        if (!message.guild.me.permissions.has("KICK_MEMBERS")) return message.reply("I can't kick members! Contact your server admin to give me the `KICK_MEMBERS` permission.")
        if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply("you can't kick members!")
        
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
        if (target === message.author) return message.reply("you can't kick yourself!")
        if (!target.kickable) return message.reply("that member can't be kicked!")
        const author = message.guild.members.cache.get(message.author.id)
        if (author.roles.highest.comparePositionTo(target.roles.highest.id) <= 0) return message.reply("you can't kick someone with a higher/equal role than you!")

        let reason2 = args.slice(1).join(' ')
        let reason = `Kicked by ${message.author.tag} with reason "${args.slice(1).join(' ')}"`

        if(!reason2){ 
            reason = `Kicked by ${message.author.tag} with no reason provided.`
        }

        target.kick(reason) 
        client.modlogs({
            Member: target,
            Action: "A member was kicked!",
            Reason: reason,
            Moderator: message.author.tag,
            Color: "RED"
        }, message)
        message.channel.send(`Successfully kicked ${target}.`)
	},
};