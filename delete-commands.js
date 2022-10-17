require('dotenv').config();

const { REST, Routes } = require('discord.js');
const token = process.env.TOKEN;
const clientId = "604307885706575882";   
const guildId = "856412585862496266";

const rest = new REST({ version: '10' }).setToken(token);

// for guild-based commands
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);
