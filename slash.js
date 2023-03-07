const { REST, Routes } = require('discord.js');
require('dotenv').config();

const commands = [
    {
        name: 'hey',
        description: 'Replies with hey!',
    },
    {
        name: 'cat',
        description: 'Random cat picture!',
    },
];

const rest = new REST({ version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('registering slash commands...');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )
        console.log('slash registers success!')
    } catch (error) {
        console.log(error);
    }
})();
