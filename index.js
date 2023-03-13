const cron = require('node-cron');

require('dotenv').config();

const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, messageLink, quote } = require(`discord.js`);

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });


client.on("ready", () => {
    console.log("Bot is online!");
    client.user.setActivity(`Doing Something`, { type: "WATCHING" });
});


const xkcd = async (message) => {
    response = await fetch('https://xkcd.com/info.0.json')
    data = await response.json();
    const latest = data.num;
    const xkcd_comic_number = Math.floor(1 + Math.random() * latest);

    response = await fetch(`https://xkcd.com/${xkcd_comic_number}/info.0.json`)
    data = await response.json();
    const quote = data.img
    message.channel.send(quote);
}

const getxkcd = async (interaction) => {
    response = await fetch('https://xkcd.com/info.0.json')
    data = await response.json();
    const latest = data.num;
    const xkcd_comic_number = Math.floor(1 + Math.random() * latest);

    response = await fetch(`https://xkcd.com/${xkcd_comic_number}/info.0.json`)
    data = await response.json();
    const quote = data.img
    interaction.reply({
        content: `${quote}`,
        ephemeral: true
    });
}

const bored = async (message) => {
    response = await fetch('https://www.boredapi.com/api/activity')

    data = await response.json();
    const quote = data.activity;
    const link = data.link;
    if (data.link.length > 0) {
        message.channel.send(quote);
        message.channel.send(link);
    } else {
        message.channel.send(quote);
    }
}

const getBored = async (interaction) => {
    response = await fetch('https://www.boredapi.com/api/activity')

    data = await response.json();
    const quote = data.activity;
    const link = data.link;
    if (data.link.length > 0) {
        interaction.reply({
            content: `${quote + `\n` + link}`,
            ephemeral: true
        });
    } else {
        interaction.reply({
            content: `${quote}`,
            ephemeral: true
        });
    }
}

const anime = async (message) => {
    response = await fetch('https://api.jikan.moe/v4/random/anime')

    data = await response.json();
    let name = data.data.title_english;
    if (!name) name = data.data.title;
    const link = data.data.url;
    const trailer = data.data.trailer.url;
    if (trailer) {
        message.channel.send(`**${name}**`);
        message.channel.send(link);
        message.channel.send(trailer);
    } else {
        message.channel.send(`**${name}**`);
        message.channel.send(link);
    }
}

const getAnime = async (interaction) => {
    response = await fetch('https://api.jikan.moe/v4/random/anime')

    data = await response.json();
    let name = data.data.title_english;
    if (!name) name = data.data.title;
    const link = data.data.url;
    const trailer = data.data.trailer.url;
    if (trailer) {
        interaction.reply({
            content: `${`**` + name + `**\n` + link + `\n` + trailer}`,
            ephemeral: true
        });
    } else {
        interaction.reply({
            content: `${`**` + name + `**\n` + link}`,
            ephemeral: true
        });
    }
}

const manga = async (message) => {
    response = await fetch('https://api.jikan.moe/v4/random/manga')

    data = await response.json();
    let name = data.data.title_english;
    if (!name) name = data.data.title;
    const link = data.data.url;

    message.channel.send(`**${name}**`);
    message.channel.send(link);
}

const getManga = async (interaction) => {
    response = await fetch('https://api.jikan.moe/v4/random/manga')

    data = await response.json();
    let name = data.data.title_english;
    if (!name) name = data.data.title;
    const link = data.data.url;

    interaction.reply({
        content: `${`**` + name + `**\n` + link}`,
        ephemeral: true
    });
}

const quotes = async (message) => {
    response = await fetch('https://zenquotes.io/api/random')
    data = await response.json();
    const quote = data[0].q + " - " + data[0].a;
    message.channel.send(quote);
}

const autoQuotes = async () => {
    response = await fetch('https://zenquotes.io/api/random')
    data = await response.json();
    const quote = data[0].q + " - " + data[0].a;
    const channel = client.channels.cache.get('1077310996495990875');
    channel.send(quote);
}

const getQuotes = async (interaction) => {
    response = await fetch('https://zenquotes.io/api/random')
    data = await response.json();
    const quote = data[0].q + " - " + data[0].a;

    interaction.reply({
        content: `${quote}`,
        ephemeral: true
    });
}

const jeopardy = async (message) => {
    response = await fetch('http://jservice.io/api/random')
    data = await response.json();
    const difficulty = data[0].value;
    const answer = data[0].answer;
    const question = data[0].question;

    quote1 = `**Difficulty: ${difficulty}**\n`;
    quote2 = `>>> **Question:** ${question}\n`;
    quote3 = `**Answer:** ||${answer}||`;

    message.channel.send(quote1 + quote2 + quote3);
}

const getJeopardy = async (interaction) => {
    response = await fetch('http://jservice.io/api/random')
    data = await response.json();
    const difficulty = data[0].value;
    const answer = data[0].answer;
    const question = data[0].question;

    quote1 = `**Difficulty: ${difficulty}**\n`;
    quote2 = `>>> **Question:** ${question}\n`;
    quote3 = `**Answer:** ||${answer}||`;

    interaction.reply({
        content: `${quote1 + quote2 + quote3}`,
        ephemeral: true
    });
}

const cat = async (message) => {
    response = await fetch('https://api.thecatapi.com/v1/images/search')
    data = await response.json();
    const quote = data[0].url;
    message.channel.send(quote);
}

const getCat = async (interaction) => {
    response = await fetch('https://api.thecatapi.com/v1/images/search')
    data = await response.json();
    const quote = data[0].url;
    interaction.reply({
        content: `${quote}`,
        ephemeral: true
    });
}


client.on("messageCreate", (message) => {
    if (/*!message.content.startsWith(prefix) ||*/ message.author === client.user) return;

    // const args = message.content.slice(prefix.length).split(/ +/);
    // const command = args.shift().toLocaleLowerCase();

    const command = message.content.toLocaleLowerCase();

    //message array
    // const messageArray = message.content.split(" ");
    // const argument = messageArray.slice(1);
    // const cmd = messageArray[0];

    //Commands
    const owo = ["https://d.furaffinity.net/art/maefeline/1643916932/1643916932.maefeline_phelix_icon.jpg",
        "https://d.furaffinity.net/art/maefeline/1631375951/1631299748.maefeline_phelix_ref.png",
        "https://www.twitch.tv/phelix_the_cat_",
        "https://www.youtube.com/watch?v=_AkgzVe91Kc",
        "https://www.nytimes.com/issue/todaysheadlines/2020/09/24/todays-headlines",
        "https://www.youtube.com/watch?v=6TOXw9zQCAc",
        "https://www.youtube.com/@phelixthecat",
        "https://en.wikipedia.org/wiki/1989_Loma_Prieta_earthquake"];

    if (command === '!phelix') {
        message.channel.send(owo[Math.floor(Math.random() * owo.length)]);
    }

    if (command === '!xkcd') {
        xkcd(message);
    }

    if (message.content.toLocaleLowerCase().includes('yiff')) {
        message.channel.send("https://tenor.com/view/the-rock-gif-25266750");
    }

    if (message.content.toLocaleLowerCase().includes('game')) {
        message.channel.send("You lost the game.");
    }

    // if (message.content.toLocaleLowerCase.includes('suicide')) {
    //     message.user.send(`It's going to be okay. 
    //                   There are people that love you. 
    //                   I'll keep working on this bot to provide more help in the future.`);
    // }

    // //Shulk's lines
    // if (command === 'hey, fiora?' && message.author.bot) {
    //     setTimeout(function(){ 
    //         message.channel.send("Yes, Shulk?")
    //     }, 5000); 
    // }

    // if (command === 'do you like me?' && message.author.bot) {
    //     setTimeout(function(){ 
    //         message.channel.send("Why yes, silly!")
    //     }, 6000); 
    // }

    if (command === '!bored') {
        bored(message);
    }

    if (command === '!anime') {
        anime(message);
    }

    if (command === '!manga') {
        manga(message);
    }

    if (command === '!quote') {
        quotes(message);
    }

    if (command === '!jeopardy') {
        jeopardy(message);
    }

    if (command === '!cat') {
        cat(message);
    }

    if (command === '!commands') {
        const phelix = '!phelix - Summons random thing.\n';
        const xkcd = '!xkcd - Random xkcd comic.\n';
        const bored = '!bored - Suggests an idea.\n';
        const manga = '!manga - Random manga.\n';
        const anime = '!anime - Summons an anime.\n';
        const quote = '!quote - Random quote from someone.\n';
        const cat = '!cat - Random cat.\n';
        const jeopardy = '!jeopardy - play some jeopardy.';
        message.channel.send(phelix + xkcd + bored + manga + anime + quote + cat + jeopardy);
    }

});

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'cat') getCat(interaction);
    //if (interaction.commandName === 'dog') getDog(interaction);
    if (interaction.commandName === 'jeopardy') getJeopardy(interaction);
    if (interaction.commandName === 'anime') getAnime(interaction);
    if (interaction.commandName === 'bored') getBored(interaction);
    if (interaction.commandName === 'manga') getManga(interaction);
    if (interaction.commandName === 'quote') getQuotes(interaction);
    //if (interaction.commandName === 'phelix') getPhelix(interaction);
    if (interaction.commandName === 'xkcd') getxkcd(interaction);
});

client.login(process.env.TOKEN);

// setInterval(function(){ 
//     const channel = client.channels.cache.get('911685287380389918');
//     channel.send('content');
// }, 3000); 


// cron.schedule('0 * * * * *', () => {
//     console.log('hello!')
//     const channel = client.channels.cache.get('911685287380389918');
//     channel.send('content');
// });

// cron.schedule('0 0 11 * * * 0', () => {
//     //console.log('hello!')
//     const channel = client.channels.cache.get('1077310750500061184');
//     channel.send('*Good Morning!* Let\'s chat in the Shelter for a bit.');
// });

cron.schedule('0 11 15 * * * *', () => {
    autoQuotes();
});

// cron.schedule('0 0 11 * * * 7', () => {
//     console.log('hello!')
//     const channel = client.channels.cache.get('1077310750500061184');
//     channel.send('Time to wake up!');
// });

// cron.schedule('0 0 11 * * * 5', () => {
//     console.log('hello!')
//     const channel = client.channels.cache.get('911685287380389918');
//     channel.send('Testing!');
// });

// https://www.boredapi.com/documentation
// https://api.jikan.moe/v4/random/anime
// https://api.thecatapi.com/v1/images/search