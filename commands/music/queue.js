const Discord = require('discord.js')

module.exports = {
	name: 'queue',
	description: 'Check the queue of the music.',
    category: "Music",
	async execute(client, message, args) {
        const queue = client.distube.getQueue(message)
        if (!queue) {
            message.channel.send('Nothing playing right now!')
        } else {
            const pages = queue.songs.map( (song, id) => `**${id ? id : 'Playing'}**. ${song.name} - \`${song.formattedDuration}\``)
            let index = 0
            const list = pages.reduce((acc, cur, idx) => {
                idx % 10 ? acc[acc.length - 1].push(cur) : acc.push([cur]);
                return acc;
            }, [])

            const embed = new Discord.MessageEmbed()
            .setTitle(`Current Queue for ${message.guild.name}`)
            .setDescription(`${list[index].join('\n')}`)
            .setColor("#FCBA03")

            const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId("fast-previous")
                    .setLabel("⏮")
                    .setStyle("PRIMARY")
                    .setDisabled(false),
                new Discord.MessageButton()
                    .setCustomId("previous")
                    .setLabel("◀")
                    .setStyle("PRIMARY")
                    .setDisabled(false),
                new Discord.MessageButton()
                    .setCustomId("next")
                    .setLabel("▶")
                    .setStyle("PRIMARY")
                    .setDisabled(false),
                new Discord.MessageButton()
                    .setCustomId("fast-next")
                    .setLabel("⏭")
                    .setStyle("PRIMARY")
                    .setDisabled(false),
            )

            const sentEmbed = await message.channel.send({embeds: [embed], components: [row]})
            const collector = sentEmbed.createMessageComponentCollector({undefined, time: 30000})
            const listOfSongs = pages.length
            const listOfSongs2 = Math.ceil(listOfSongs / 10) - 1

            collector.on("collect", async component => {
                await component.deferUpdate()
                switch (component.customId) {
                    case "fast-previous":
                        index = 0
                        break;
                    case "previous":
                        if(index - 1 >= 0) index--;
                        break;
                    case "next":
                        if(index + 1 < pages.length) index++;
                        break;
                    case "fast-next":
                        index = listOfSongs2
                        break;
                }
                const paginated = new Discord.MessageEmbed()
                .setTitle(`Current Queue for ${message.guild.name}`)
                .setDescription(`${list[index].join('\n')}`)
                .setColor("#FCBA03")

                await sentEmbed.edit({embeds: [paginated], components: [row]})
            })

            collector.on('end', async collected => {
                const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId("fast-previous")
                        .setLabel("⏮")
                        .setStyle("PRIMARY")
                        .setDisabled(true),
                    new Discord.MessageButton()
                        .setCustomId("previous")
                        .setLabel("◀")
                        .setStyle("PRIMARY")
                        .setDisabled(true),
                    new Discord.MessageButton()
                        .setCustomId("next")
                        .setLabel("▶")
                        .setStyle("PRIMARY")
                        .setDisabled(true),
                    new Discord.MessageButton()
                        .setCustomId("fast-next")
                        .setLabel("⏭")
                        .setStyle("PRIMARY")
                        .setDisabled(true),
                )
                await sentEmbed.edit({embeds: [embed], components: [row]})
            })


        }
	},
};