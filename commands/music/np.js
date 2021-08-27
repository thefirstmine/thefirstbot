const Discord = require('discord.js')

module.exports = {
	name: 'np',
	description: 'Check the currently playing song in the queue.',
    category: "Music",
	async execute(client, message, args) {
        const queue = client.distube.getQueue(message)
        if (!queue) {
            message.channel.send('Nothing playing right now!')
        } else {
            let maxSymbols=15
            let bar = "━".repeat(maxSymbols).split('').map((v, i) => i == Math.trunc((queue.currentTime / queue.songs[0].duration) * maxSymbols) ? "🟡" : v).join('')
            const embed = new Discord.MessageEmbed()
            .setTitle("Currently Playing:")
            .setDescription(`[${queue.songs[0].name}](${queue.songs[0].url})\n${queue.formattedCurrentTime} - ${queue.songs[0].formattedDuration}\n${bar}`)
            .setThumbnail(`${queue.songs[0].thumbnail}`)
            .setColor("#FCBA03")

            message.channel.send({embeds: [embed]})
        }
	},
};