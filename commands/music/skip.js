const Discord = require('discord.js')

module.exports = {
	name: 'skip',
	description: 'Skips the currently playing song and plays the next one.',
    category: "Music",
	async execute(client, message, args) {
        const queue = client.distube.getQueue(message)
		if(!queue) return message.channel.send("Nothing is playing right now! Use the `play` command to play something!")
        client.distube.skip(message)
		message.react("✅")
	},
};