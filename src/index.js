require('dotenv').config();
const cron = require('node-cron');
const command_methods = require('./methods/command_methods');
const slash_methods = require('./methods/slash_methods');
const auto_methods = require('./methods/auto_methods');

//Cloud port imports
const express = require('express');
const app = express();

//Sentiment analyzer imports
const fs = require('fs');
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

//Discord bot import
const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, messageLink, quote } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

//Data analysis for fine tuning sentiment alalyzer
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

// Define a Map to store the last 50 messages for each user
const userMessages = new Map();

// Function to calculate the average sentiment score for all messages in the user's message history
const trackSentiment = (messageHistory) => {
  const totalScore = messageHistory.reduce((accumulator, score) => accumulator + score, 0);
  const averageScore = totalScore / messageHistory.length;
  return averageScore;
};


client.on("messageCreate", async (message) => {
  if (message.author === client.user || message.author.bot) return;

  // This part of the code is to keep my friends safe. If they ever need help. I'll be there for them.
  // Tracks sentiment for testing and implementing a threshhold to send a message to protect users from negative feelings.
  if (message.content.charAt(0) !== "!") {
    const tokens = tokenizer.tokenize(message.content);
    const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');
    const sentiment = analyzer.getSentiment(tokens);

    const messageHistory = userMessages.get(message.author.id) || [];
    messageHistory.push(sentiment);

    if (messageHistory.length > 50) messageHistory.shift(); // Remove the oldest message
    userMessages.set(message.author.id, messageHistory);

    const averageSentimentScore = trackSentiment(messageHistory);

    // Check the average sentiment score and perform actions based on the threshold
    if (averageSentimentScore <= -0.55 && messageHistory.length >= 10) {
      // Reset the message history for the user
      userMessages.set(message.author.id, []);
      auto_methods.specialSOS(message);
    }

    logToCSV(sentiment);
  }

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

  if (message.content.toLocaleLowerCase().includes('yiff')) {
    message.channel.send("https://tenor.com/view/the-rock-gif-25266750");
  }

  // Message commands that displays publicly
  switch (command) {
    case '!phelix':
      message.channel.send(phelixList[Math.floor(Math.random() * phelixList.length)]);
      break;
    case '!xkcd':
      command_methods.xkcd(message);
      break;
    case '!bored':
      command_methods.bored(message);
      break;
    case '!anime':
      command_methods.anime(message);
      break;
    case '!manga':
      command_methods.manga(message);
      break;
    case '!quote':
      command_methods.quotes(message);
      break;
    case '!jeopardy':
      command_methods.jeopardy(message);
      break;
    case '!cat':
      command_methods.cat(message);
      break;
    case '!dog':
      command_methods.dog(message);
      break;
    case '!commands':
      const commands = [
        { name: '!phelix', description: 'Summons random thing.' },
        { name: '!xkcd', description: 'Random xkcd comic.' },
        { name: '!bored', description: 'Suggests an idea.' },
        { name: '!manga', description: 'Random manga.' },
        { name: '!anime', description: 'Summons an anime.' },
        { name: '!quote', description: 'Random quote from someone.' },
        { name: '!cat', description: 'Random cat.' },
        { name: '!dog', description: 'Random dog.' },
        { name: '!jeopardy', description: 'Play some jeopardy.' }
      ];

      let commandMessage = 'Available commands:\n';
      for (const cmd of commands) {
        commandMessage += `${cmd.name} - ${cmd.description}\n`;
      }
      message.channel.send(commandMessage);
      break;
  }
});

// Interaction commands for private messages
client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  switch (interaction.commandName) {
    case 'cat':
      slash_methods.cat(interaction);
      break;
    case 'dog':
      slash_methods.dog(interaction);
      break;
    case 'jeopardy':
      slash_methods.jeopardy(interaction);
      break;
    case 'anime':
      slash_methods.anime(interaction);
      break;
    case 'bored':
      slash_methods.bored(interaction);
      break;
    case 'manga':
      slash_methods.manga(interaction);
      break;
    case 'quote':
      slash_methods.quotes(interaction);
      break;
    case 'xkcd':
      slash_methods.xkcd(interaction);
      break;
    case 'sos':
      slash_methods.SOS(interaction);
      break;
  }
});

client.login(process.env.TOKEN);

cron.schedule('0 11 15 * * * *', () => {
  auto_methods.quotes(client);
});

// cron.schedule('0 21 18 * * * *', () => {
//   auto_methods.cursed_quotes(client);
// });

const port = 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
