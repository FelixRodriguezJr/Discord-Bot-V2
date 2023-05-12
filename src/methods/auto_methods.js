const fetch = require('node-fetch');

const quotes = async () => {
    try {
        response = await fetch('https://zenquotes.io/api/random');
        if (!response.ok) throw new Error(`auto quotes network response not okay!`);
        data = await response.json();
        //console.log(data);

        const quote = data[0].q + " - " + data[0].a;
        const channel = client.channels.cache.get('1077310996495990875');
        channel.send(quote);
    } catch (error) {
        console.log(`Error 1C: ${error.message}`);
    }
}

const specialSOS = (message) => {
    message.author.send('https://en.wikipedia.org/wiki/List_of_suicide_crisis_lines');
    message.author.send('This is a list of hotlines to call if you ever find yourself in detress.');

    setTimeout(() => {
        message.author.send(`It\'s okay. You\'re still here. You can still have a happy tomorrow, ${message.author.username}.`);
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
        message.author.send(`Sooner or later, that happy day will come. Stay strong for me, for you, your friends, and family. You are loved ${message.author.username}. :heart:`);
    }, 24000);

    setTimeout(() => {
        message.author.send('https://youtube.com/watch?v=0d8R1u4vj1Q');
    }, 28000);

}

module.exports = {
    quotes,
    specialSOS,
}
