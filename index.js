require('dotenv').config();
const cron = require('node-cron');
const fetch = require('node-fetch');
const command_methods = require('./methods/command_methods');
const slash_methods = require('./methods/slash_methods');
const auto_methods = require('./methods/auto_methods');
const fs = require('fs');

const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, messageLink, quote } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const logToCSV = (score) => {
    const csvString = `${new Date()},${score}\n`;

    fs.appendFile('log.csv', csvString, (error) => {
        if (error) throw error;
        //console.log('saved to csv');
    });
}

client.on("ready", () => {
    console.log("Bot is online!");
    client.user.setActivity(`Doing Something`, { type: "WATCHING" });
});

client.on("messageCreate", async (message) => {
    if (message.author === client.user || message.author.bot) return;

    // Tracks sentiment for testing and implementing a threshhold to send a message to protect users from negative feelings.
    const tokens = tokenizer.tokenize(message.content);
    const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');
    const sentiment = analyzer.getSentiment(tokens);
    logToCSV(sentiment);

    const command = message.content.toLocaleLowerCase();

    //Commands
    const phelixList = [
        "https://d.furaffinity.net/art/maefeline/1643916932/1643916932.maefeline_phelix_icon.jpg",
        "https://d.furaffinity.net/art/maefeline/1631375951/1631299748.maefeline_phelix_ref.png",
        "https://www.twitch.tv/phelix_the_cat_",
        "https://www.youtube.com/watch?v=_AkgzVe91Kc",
        "https://www.nytimes.com/issue/todaysheadlines/2020/09/24/todays-headlines",
        "https://www.youtube.com/watch?v=6TOXw9zQCAc",
        "https://www.youtube.com/@phelixthecat",
    ];

    if (command === '!phelix') {
        message.channel.send(phelixList[Math.floor(Math.random() * phelixList.length)]);
    }

    if (message.content.toLocaleLowerCase().includes('yiff')) {
        message.channel.send("https://tenor.com/view/the-rock-gif-25266750");
    }

    // This part of the code is to keep my friends safe. If they ever need help. I'll be there for them.
    // Unused code goes here.

    //Message commands that displays publicly
    if (command === '!xkcd') command_methods.xkcd(message);
    if (command === '!bored') command_methods.bored(message);
    if (command === '!anime') command_methods.anime(message);
    if (command === '!manga') command_methods.manga(message);
    if (command === '!quote') command_methods.quotes(message);
    if (command === '!jeopardy') command_methods.jeopardy(message);
    if (command === '!cat') command_methods.cat(message);
    if (command === '!dog') command_methods.dog(message);

    if (command === '!commands') {
        const phelix = '!phelix - Summons random thing.\n';
        const xkcd = '!xkcd - Random xkcd comic.\n';
        const bored = '!bored - Suggests an idea.\n';
        const manga = '!manga - Random manga.\n';
        const anime = '!anime - Summons an anime.\n';
        const quote = '!quote - Random quote from someone.\n';
        const cat = '!cat - Random cat.\n';
        const dog = '!dog - Random dog.\n';
        //const saftey = '!safety - Activate safe mode.\n'
        const jeopardy = '!jeopardy - play some jeopardy.';
        message.channel.send(
            phelix + xkcd + bored + manga + anime + quote + cat + dog + jeopardy);
    }

});

//Interaction commands for private messages
client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'cat') slash_methods.cat(interaction);
    if (interaction.commandName === 'dog') slash_methods.dog(interaction);
    if (interaction.commandName === 'jeopardy') slash_methods.jeopardy(interaction);
    if (interaction.commandName === 'anime') slash_methods.anime(interaction);
    if (interaction.commandName === 'bored') slash_methods.bored(interaction);
    if (interaction.commandName === 'manga') slash_methods.manga(interaction);
    if (interaction.commandName === 'quote') slash_methods.quotes(interaction);
    if (interaction.commandName === 'xkcd') slash_methods.xkcd(interaction);
    if (interaction.commandName === 'sos') slash_methods.SOS(interaction);
});

client.login(process.env.TOKEN);

cron.schedule('0 11 15 * * * *', () => {
    auto_methods.autoQuotes();
});
