const fetch = require('node-fetch');

const xkcd = async (message) => {
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
        message.channel.send({
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
        console.log(`Error 1B: ${error.message}`);
    }
}

const bored = async (message) => {
    try {
        response = await fetch(`https://www.boredapi.com/api/activity`);
        if (!response.ok) throw new Error(`bored network response not okay!`);
        data = await response.json();
        //console.log(data);

        const quote = data.activity;
        const link = data.link;
        if (data.link.length > 0) {
            message.channel.send(`${quote}\n${link}`);
        } else {
            message.channel.send(quote);
        }
    } catch (error) {
        console.log(`Error 2B: ${error.message}`);
    }
}

const anime = async (message) => {
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

        message.channel.send(messages.join('\n'));
    } catch (error) {
        console.log(`Error 3B: ${error.message}`);
    }
}

const manga = async (message) => {
    try {
        response = await fetch(`https://api.jikan.moe/v4/random/manga`);
        if (!response.ok) throw new Error(`manga network response not okay!`);
        data = await response.json();
        //console.log(data);

        let name = data.data.title_english ? data.data.title_english : data.data.title;
        const link = data.data.url;

        message.channel.send(`**${name}**\n${link}`);
    } catch (error) {
        console.log(`Error 4B: ${error.message}`);
    }
}

const quotes = async (message) => {
    try {
        response = await fetch(`https://zenquotes.io/api/random`);
        if (!response.ok) throw new Error(`quotes network response not okay!`);
        data = await response.json();
        //console.log(data);

        const quote = data[0].q + " - " + data[0].a;
        message.channel.send(quote);
    } catch (error) {
        console.log(`Error 5B: ${error.message}`);
    }
}

const jeopardy = async (message) => {
    try {
        response = await fetch(`http://jservice.io/api/random`);
        if (!response.ok) throw new Error(`jeopardy network response not okay!`);
        data = await response.json();
        //console.log(data);

        const difficulty = data[0].value;
        const answer = data[0].answer;
        const question = data[0].question;

        message.channel.send(`**Difficulty: ${difficulty}**\n>>> **Question:** ${question}\n**Answer:** ||${answer}||`);
    } catch (error) {
        console.log(`Error 6B: ${error.message}`);
    }
}

const cat = async (message) => {
    try {
        response = await fetch('https://api.thecatapi.com/v1/images/search');
        if (!response.ok) throw new Error(`cat network response not okay!`);
        data = await response.json();
        //console.log(data);

        const quote = data[0].url;
        message.channel.send(quote);
    } catch (error) {
        console.log(`Error 7B: ${error.message}`);
    }
}

const dog = async (message) => {
    try {
        response = await fetch('https://dog.ceo/api/breeds/image/random');
        if (!response.ok) throw new Error(`dog network response not okay!`);
        data = await response.json();
        //console.log(data);

        const quote = data.message;
        message.channel.send(quote);
    } catch (error) {
        console.log(`Error 8B: ${error.message}`);
    }
}

module.exports = {
    dog,
    cat,
    jeopardy,
    quotes,
    manga,
    anime,
    bored,
    xkcd,
}
