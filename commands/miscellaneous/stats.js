const { EmbedBuilder } = require("discord.js");
require("moment-duration-format");
const cpuStat = require("cpu-stat");
const moment = require("moment");

module.exports = {
	name: 'stats',
	description: 'Check bot stats!',
    category: "Miscellaneous",
    aliases: ['statistics', 'uptime', 'ping'],
	execute(client, message, args) {
        const { version } = require("discord.js")
        cpuStat.usagePercent(async function (err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
        const duration = moment.duration(message.client.uptime).format(" D[d], H[h], m[m]");

        const embed = new EmbedBuilder()
        embed.setColor("#FCBA03")
        embed.setTitle(`Stats for ${client.user.username}!`)
        embed.addFields({
            name: ':ping_pong: Ping',
            value: `┕\`${Math.round(client.ws.ping)}ms\``,
            inline: true
        },
        {
            name: ':clock1: Uptime',
            value: `┕\`${duration}\``,
            inline: true
        },{
            name: ':file_cabinet: Memory',
            value: `┕\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}mb\``,
            inline: true
        })

        embed.addFields({
            name: ':blue_book: Discord.js', 
            value: `┕\`v${version}\``,
            inline: true
        },{
            name: ':green_book: Node',
            value: `┕\`${process.version}\``,
            inline: true
        })

        return message.channel.send({embeds: [embed]});
        })
	},
};