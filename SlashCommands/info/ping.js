const { CommandInteraction, Client} = require('discord.js');

module.exports = {
    name: "test",
    description: "This is a test!",

    run: async(client, interaction, args) => {
        interaction.editReply({content: 'Test was poggers lol XDDDDD'})
    }
}