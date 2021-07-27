const Discord = require("discord.js")

module.exports = {
	name: 'warn',
	description: 'Warn a member.',
    args: true,
    usage: "[member] <reason>",
    category: "Moderation",
	async execute (client, message, args) {
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply("you can't warn members! You need the `MANAGE_MESSAGES` permission for this.")
        
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
        if (target === message.author) return message.reply("you can't warn yourself!")
        if (message.guild.member(message.author).roles.highest.comparePositionTo(target.roles.highest.id) <= 0) return message.reply("you can't warn someone with a higher/equal role than you!")

        let reason2 = args.slice(1).join(' ')
        let reason = `Warned by ${message.author.tag} with reason "${args.slice(1).join(' ')}"`

        if(!reason2){ 
            reason = `Warned by ${message.author.tag} with no reason provided.`
        }
        
        target.user.send(`You have been warned in \`${message.guild}\` for: ${reason}`)
        .catch(error => {
            message.channel.send(`Looks like ${target} cant be DM'ed! They will be still warned nonetheless. (this will also still send to the log channel if you have one)`)
        })
        client.modlogs({
            Member: target,
            Action: "A member was warned!",
            Reason: reason,
            Moderator: message.author.tag,
            Color: "RED"
        }, message)
        message.channel.send(`Successfully warned ${target}.`)
	},
};