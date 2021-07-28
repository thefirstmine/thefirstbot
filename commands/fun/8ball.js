const nekoClient = require('nekos.life')
const neko = new nekoClient();
const Discord = require('discord.js')

module.exports = {
	name: '8ball',
	description: 'Ask the all mighty 8Ball a question!',
	category: "Fun",
    args: true,
    usage: "[question]",
	async execute(client, message, args) {

        const ballText = args.slice(0).join(' ')
        const ballAnswered = await neko.sfw['8Ball']({text: ballText});
        
        await message.reply({content: ballAnswered.response})
	},
};