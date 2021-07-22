const owoify = require("owoify-js").default
const Discord = require('discord.js')

module.exports = {
	name: 'owoify',
	description: 'OwOify a piece of text',
	category: "Fun",
    args: true,
    usage: "[text]",
	async execute(client, message, args) {

        const owoText = owoify(args.slice(0).join(' '))
        
        message.reply(owoText, {split: true})
	},
};