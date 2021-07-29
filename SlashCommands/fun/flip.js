const nekoClient = require('nekos.life')
const neko = new nekoClient();
const Discord = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: "flip",
    description: "Flip a coin!",
    run: async(client, interaction, args) => {
        function randomFlip(){
            const flip = ['Heads.', 'Tails.'];
            return flip[Math.floor(Math.random()*flip.length)];
        }
        interaction.editReply({content: `Flip! I call ${randomFlip()}`})
    }
}