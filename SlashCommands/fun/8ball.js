const nekoClient = require('nekos.life')
const neko = new nekoClient();
const Discord = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: "8ball",
    description: "Ask the all-mighty 8ball a question!",
    options: [
        {
            name: 'question',
            description: 'Ask the all-mighty 8ball a question!',
            type: 'STRING',
            required: true
        }
    ],
    run: async(client, interaction, args) => {
        const [question] = args;
        const ballAnswered = await neko.sfw['8Ball']({text: question});
        
        const embed = new Discord.EmbedBuilder()
        .setTitle("I have answered.")
        .setDescription(`Your question was: \`${question}\`\nMy answer is, ${ballAnswered.response}`)
        .setColor("#FCBA03")


        await interaction.editReply({embeds: [embed]})
    }
}