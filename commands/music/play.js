const Discord = require('discord.js')

module.exports = {
	name: 'play',
	description: 'Play a song!',
    category: "Music",
    voiceOnly: true,
	async execute(client, message, args) {
        const query = args.join(" ")
        if(!query) return message.reply("Please enter a song name/link!")
        
        await client.distube.play(message, query)
	},
};