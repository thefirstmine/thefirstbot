const Discord = require('discord.js')

module.exports = {
	name: 'resume',
	description: 'Resume the current song.',
    category: "Music",
	async execute(client, message, args) {
		const queue = client.distube.getQueue(message)
		if(!queue) return message.channel.send("Nothing is playing right now! Use the `play` command to play something!")
        client.distube.resume(message)
        message.react("✅")
	},
};