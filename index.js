const cron = require('node-cron');

require('dotenv').config();

const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, messageLink, quote } = require(`discord.js`);

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });


client.on("ready", () => {
    console.log("Bot is online!");
    client.user.setActivity(`Doing Something`, { type: "WATCHING" });
});


const xkcd = async (message) => {
    response = await fetch('https://xkcd.com/info.0.json');
    data = await response.json();
    const latest = data.num;
    const xkcd_comic_number = Math.floor(1 + Math.random() * latest);

    response = await fetch(`https://xkcd.com/${xkcd_comic_number}/info.0.json`);
    data = await response.json();
    const quote = data.img
    message.channel.send(quote);
}

const getxkcd = async (interaction) => {
    response = await fetch('https://xkcd.com/info.0.json');
    data = await response.json();
    const latest = data.num;
    const xkcd_comic_number = Math.floor(1 + Math.random() * latest);

    response = await fetch(`https://xkcd.com/${xkcd_comic_number}/info.0.json`);
    data = await response.json();
    const quote = data.img
    interaction.reply({
        content: `${quote}`,
        ephemeral: true
    });
}

const bored = async (message) => {
    response = await fetch('https://www.boredapi.com/api/activity');

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
    response = await fetch('https://www.boredapi.com/api/activity');

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
    response = await fetch('https://api.jikan.moe/v4/random/anime');

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
    response = await fetch('https://api.jikan.moe/v4/random/manga');

    data = await response.json();
    let name = data.data.title_english;
    if (!name) name = data.data.title;
    const link = data.data.url;

    message.channel.send(`**${name}**`);
    message.channel.send(link);
}

const getManga = async (interaction) => {
    response = await fetch('https://api.jikan.moe/v4/random/manga');

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
    response = await fetch('https://zenquotes.io/api/random');
    data = await response.json();
    const quote = data[0].q + " - " + data[0].a;
    message.channel.send(quote);
}

const autoQuotes = async () => {
    response = await fetch('https://zenquotes.io/api/random');
    data = await response.json();
    const quote = data[0].q + " - " + data[0].a;
    const channel = client.channels.cache.get('1077310996495990875');
    channel.send(quote);
}

const getQuotes = async (interaction) => {
    response = await fetch('https://zenquotes.io/api/random');
    data = await response.json();
    const quote = data[0].q + " - " + data[0].a;

    interaction.reply({
        content: `${quote}`,
        ephemeral: true
    });
}

const jeopardy = async (message) => {
    response = await fetch('http://jservice.io/api/random');
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
    response = await fetch('http://jservice.io/api/random');
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
    response = await fetch('https://api.thecatapi.com/v1/images/search');
    data = await response.json();
    const quote = data[0].url;
    message.channel.send(quote);
}

const getCat = async (interaction) => {
    response = await fetch('https://api.thecatapi.com/v1/images/search');
    data = await response.json();
    const quote = data[0].url;
    interaction.reply({
        content: `${quote}`,
        ephemeral: true
    });
}

const dog = async (message) => {
    response = await fetch('https://dog.ceo/api/breeds/image/random');
    data = await response.json();
    const quote = data.message;
    message.channel.send(quote);
}

const getDog = async (interaction) => {
    response = await fetch('https://dog.ceo/api/breeds/image/random');
    data = await response.json();
    const quote = data.message;
    interaction.reply({
        content: `${quote}`,
        ephemeral: true
    });
}

const getSOS = async (interaction) => {
    const quote = 'https://en.wikipedia.org/wiki/List_of_suicide_crisis_lines';
    interaction.reply({
        content: `${quote}`,
        ephemeral: true
    });
}


client.on("messageCreate", (message) => {
    if (message.author === client.user) return;

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

    if (message.content.toLocaleLowerCase().includes('rock')) {
        message.channel.send("https://tenor.com/view/the-rock-gif-25266750");
    }

    if (message.content.toLocaleLowerCase().includes('game')) {
        message.channel.send("You lost the game.");
    }

    // This part of the code is to keep my friends safe. If they ever need help. I'll be there for them.
    const suicideKeywords = [
        "suicide",
        "kill myself",
        "end my life",
        "suicidal",
        "self-harm",
        "hopeless",
        "worthless",
        "depressed",
        "anxious",
        "lonely",
        "isolate",
        "helpless",
        "pain",
        "die",
        "not living",
        "no reason to live",
        "lost",
        "meaningless",
        "empty",
        "despair",
        "unalive",
        "murder",
        "stab",
        "stabbing",
        "hang",
        "anxiety",
        "goodbye",
        "farewell",
        "final",
        "eternal rest",
        "last breath",
        "rest in peace",
        "resting place",
        "eternity",
        "eternal sleep",
        "eternal silence",
        "eternal darkness"
    ];

    // if (command === '!safety') {
    //     var role = message.guild.roles.cache.find(role => role.name === 'saftey');
    //     message.member.roles.add(role);
    // }

    // if (command === '!unsafety') {
    //     var role = message.guild.roles.cache.find(role => role.name === 'saftey');
    //     message.member.roles.remove(role);
    // }

    if (message.member.roles.cache.some(role => role.name === 'safety')) {
        for (const word of suicideKeywords) {
            if (message.content.toLocaleLowerCase().includes(word)) {
                message.author.send('https://en.wikipedia.org/wiki/List_of_suicide_crisis_lines');
                message.author.send('This is a list of hotlines to call if you ever find yourself in detress.');
            }
        }
    }

    count = 0;
    for (const word of suicideKeywords) {
        if (message.content.toLocaleLowerCase().includes(word)) {
            count++;
            if (count === 3) {
                message.author.send('https://en.wikipedia.org/wiki/List_of_suicide_crisis_lines');
                message.author.send('This is a list of hotlines to call if you ever find yourself in detress.');

                setTimeout(() => {
                    message.author.send('It\'s okay. You\'re still here. You can still have a happy tomorrow.');
                }, 4000);

                setTimeout(() => {
                    message.author.send('You could lose everything, but that doesn\'t make you worthless.');
                }, 8000);

                setTimeout(() => {
                    message.author.send('I still care about you, even if we don\'t know each other that well.');
                }, 12000);

                setTimeout(() => {
                    message.author.send('The time we could spend together making memories. We can still have that.');
                }, 16000);

                setTimeout(() => {
                    message.author.send('You can still have that with everyone. It\'s okay to be sad.');
                }, 20000);

                setTimeout(() => {
                    message.author.send('Sooner or later, that happy day will come. Stay strong for me, for you, your friends, and family. :heart:');
                }, 24000);

                setTimeout(() => {
                    message.author.send('https://youtube.com/watch?v=0d8R1u4vj1Q');
                }, 28000);
            }
        }
    }

    //Message commands that displays publicly
    if (command === '!xkcd') xkcd(message);
    if (command === '!bored') bored(message);
    if (command === '!anime') anime(message);
    if (command === '!manga') manga(message);
    if (command === '!quote') quotes(message);
    if (command === '!jeopardy') jeopardy(message);
    if (command === '!cat') cat(message);
    if (command === '!dog') dog(message);

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

    if (interaction.commandName === 'cat') getCat(interaction);
    if (interaction.commandName === 'dog') getDog(interaction);
    if (interaction.commandName === 'jeopardy') getJeopardy(interaction);
    if (interaction.commandName === 'anime') getAnime(interaction);
    if (interaction.commandName === 'bored') getBored(interaction);
    if (interaction.commandName === 'manga') getManga(interaction);
    if (interaction.commandName === 'quote') getQuotes(interaction);
    if (interaction.commandName === 'xkcd') getxkcd(interaction);
    if (interaction.commandName === 'sos') getSOS(interaction);
});

client.login(process.env.TOKEN);

cron.schedule('0 11 15 * * * *', () => {
    autoQuotes();
});

// https://www.boredapi.com/documentation
// https://api.jikan.moe/v4/random/anime
// https://api.thecatapi.com/v1/images/search
