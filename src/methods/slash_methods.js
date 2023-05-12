const fetch = require('node-fetch');

const xkcd = async (interaction) => {
    try {
        const response = await fetch(`https://xkcd.com/info.0.json`);
        if (!response.ok) throw new Error(`xkcd network (1) response not okay!`);
        data = await response.json();
        //console.log(data);

        const latest = data.num;
        const xkcd_comic_number = Math.floor(1 + Math.random() * latest);

        const response2 = await fetch(`https://xkcd.com/${xkcd_comic_number}/info.0.json`);
        if (!response2.ok) throw new Error(`xkcd network (2) response not okay!`);
        data2 = await response2.json();
        //console.log(data2);

        const quote = data2.img;
        const title = data2.safe_title;
        const number = data2.num;
        interaction.reply({
            embeds: [
              {
                title: `#${number}: ${title}`,
                image: {
                  url: quote
                }
              }
            ],
            ephemeral: true
          });          
    } catch (error) {
        console.log(`Error 1A: ${error.message}`);
    }
}

const bored = async (interaction) => {
    try {
        response = await fetch(`https://www.boredapi.com/api/activity`);
        if (!response.ok) throw new Error(`bored network response not okay!`);
        data = await response.json();
        //console.log(data);

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
    } catch (error) {
        console.log(`Error 2A: ${error.message}`);
    }
}

const anime = async (interaction) => {
    try {
        response = await fetch(`https://api.jikan.moe/v4/random/anime`);
        if (!response.ok) throw new Error(`anime network response not okay!`);
        data = await response.json();
        //console.log(data);

        let name = data.data.title_english || data.data.title;
        const link = data.data.url;
        const trailer = data.data.trailer?.url;

        const messages = [`**${name}**`, link];
        if (trailer) messages.push(trailer);

        interaction.reply({
            content: `${messages.join('\n')}`,
            ephemeral: true
        });
    } catch (error) {
        console.log(`Error 3A: ${error.message}`);
    }
}

const manga = async (interaction) => {
    try {
        response = await fetch(`https://api.jikan.moe/v4/random/manga`);
        if (!response.ok) throw new Error(`manga network response not okay!`);
        data = await response.json();
        //console.log(data);

        let name = data.data.title_english ? data.data.title_english : data.data.title;
        const link = data.data.url;

        interaction.reply({
            content: `${`**` + name + `**\n` + link}`,
            ephemeral: true
        });
    } catch (error) {
        console.log(`Error 4A: ${error.message}`);
    }
}

const quotes = async (interaction) => {
    try {
        response = await fetch(`https://zenquotes.io/api/random`);
        if (!response.ok) throw new Error(`quotes network response not okay!`);
        data = await response.json();
        //console.log(data);

        const quote = data[0].q + " - " + data[0].a;
        interaction.reply({
            content: `${quote}`,
            ephemeral: true
        });
    } catch (error) {
        console.log(`Error 5A: ${error.message}`);
    }
}

const jeopardy = async (interaction) => {
    try {
        response = await fetch(`http://jservice.io/api/random`);
        if (!response.ok) throw new Error(`jeopardy network response not okay!`);
        data = await response.json();
        //console.log(data);

        const difficulty = data[0].value;
        const answer = data[0].answer;
        const question = data[0].question;

        interaction.reply({
            content: `**Difficulty: ${difficulty}**\n>>> **Question:** ${question}\n**Answer:** ||${answer}||`,
            ephemeral: true
        });
    } catch (error) {
        console.log(`Error 6A: ${error.message}`);
    }
}

const cat = async (interaction) => {
    try {
        response = await fetch('https://api.thecatapi.com/v1/images/search');
        if (!response.ok) throw new Error(`cat network response not okay!`);
        data = await response.json();
        //console.log(data);

        const quote = data[0].url;
        interaction.reply({
            content: `${quote}`,
            ephemeral: true
        });
    } catch (error) {
        console.log(`Error 7A: ${error.message}`);
    }
}

const dog = async (interaction) => {
    try {
        response = await fetch('https://dog.ceo/api/breeds/image/random');
        if (!response.ok) throw new Error(`dog network response not okay!`);
        data = await response.json();
        //console.log(data);

        const quote = data.message;
        interaction.reply({
            content: `${quote}`,
            ephemeral: true
        });
    } catch (error) {
        console.log(`Error 8A: ${error.message}`);
    }
}

const SOS = async (interaction) => {
    try {
        quote = 'https://en.wikipedia.org/wiki/List_of_suicide_crisis_lines';

        interaction.reply({
            content: `${quote}`,
            ephemeral: true
        });
    } catch (error) {
        console.log(`Error 9A: ${error.message}`);
    }
}

module.exports = {
    SOS,
    dog,
    cat,
    jeopardy,
    quotes,
    manga,
    anime,
    bored,
    xkcd,
}
