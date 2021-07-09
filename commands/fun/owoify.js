const nekoClient = require('nekos.life')
const neko = new nekoClient();
const Discord = require('discord.js')

module.exports = {
	name: 'owoify',
	description: 'OwOify a piece of text',
	category: "Fun",
    args: true,
    usage: "[text]",
	async execute(client, message, args) {

        const owoText = args.slice(0).join(' ')
        const owoified = await neko.sfw.OwOify({text: owoText});
        
        message.reply(owoified.owo)
	},
};