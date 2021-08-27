const Discord = require('discord.js')

module.exports = {
	name: 'stop',
	description: 'Stops playing any music.',
    category: "Music",
	aliases: ['dc', 'disconnect', 'fuckoff'],
	async execute(client, message, args) {
		const queue = client.distube.getQueue(message)
		if(!queue) return message.channel.send("Nothing is playing right now! Use the `play` command to play something!")
        client.distube.stop(message)
        message.react("✅")
	},
};