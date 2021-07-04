module.exports = {
	name: 'ping',
	description: 'Ping! Checks ping, duh',
	execute(client, message, args) {
        message.channel.send(`🏓 Pong! ${Date.now() - message.createdTimestamp}ms.`)
	},
};