const { REST, Routes } = require('discord.js');
require('dotenv').config();

const commands = [
    {
        name: 'cat',
        description: 'Random cat picture!',
    },
    {
        name: 'dog',
        description: 'Random dog picture!',
    },
    // {
    //     name: 'Phelix',
    //     description: 'Summons Phelix.',
    // },
    {
        name: 'jeopardy',
        description: 'Summons a random jeopardy question.',
    },
    {
        name: 'anime',
        description: 'Summons a random anime.',
    },
    {
        name: 'bored',
        description: 'Suggests an idea.',
    },
    {
        name: 'manga',
        description: 'Summons a random manga.',
    },
    {
        name: 'quote',
        description: 'Summons a random quote.',
    },
    {
        name: 'xkcd',
        description: 'pulls up random xkcd.',
    },
    {
        name: 'sos',
        description: 'pulls up list of suicide hotlines.',
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
