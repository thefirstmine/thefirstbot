const Discord = require('discord.js')

module.exports = {
	name: 'pause',
	description: 'Pause the currently playing song.',
    category: "Music",
	voiceOnly: true,
	async execute(client, message, args) {
		const queue = client.distube.getQueue(message)
		if(!queue) return message.channel.send("Nothing is playing right now! Use the `play` command to play something!")
        client.distube.pause(message)
		message.react("✅")
	},
};