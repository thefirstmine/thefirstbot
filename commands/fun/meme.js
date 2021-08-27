const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
	name: 'meme',
	description: 'Find a random meme!',
    category: "Fun",
	async execute(client, message, args) {
        const subs = [
            "dankmemes",
            "memes"
        ]

        const randSubs = subs[Math.floor(Math.random() * subs.length)]

        fetch(`http://meme-api.herokuapp.com/gimme/${randSubs}`)
        .then(res => res.json())
        .then(json => {
            if(json.nsfw && !message.channel.nsfw) return message.reply("Sorry, there are no memes to be fetched right now, try executing the command again!")
            if(!json) return message.reply("Sorry, there are no memes to be fetched right now, try executing the command again!")
            
            const title = json.title.toString()
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${title}`, null, `${json.postLink}`)
            .setImage(`${json.url}`)
            .setColor("RANDOM")
            .setFooter(`${json.ups || 0} 👍 on r/${json.subreddit}`)

    
            message.channel.send({embeds: [embed]})
        })


	},
};