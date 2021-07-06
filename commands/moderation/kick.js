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
        if (target === message.author.username || message.author.id || message.author.username) return message.reply("you can't ban yourself!")

        let reason2 = args.slice(1).join(' ')
        let reason = `Kicked by ${message.author.tag} with reason "${args.slice(1).join(' ')}"`

        if(!reason2){ 
            reason = `Kicked by ${message.author.tag} with no reason provided.`
        }

        target.kick(reason) 

        message.channel.send(`Successfully kicked ${target}.`)
	},
};