const fetch = require('node-fetch');

const autoQuotes = async () => {
    try {
        response = await fetch('https://zenquotes.io/api/random');
        if (!response.ok) throw new Error(`auto quotes network response not okay!`);
        data = await response.json();
        //console.log(data);

        const quote = data[0].q + " - " + data[0].a;
        const channel = client.channels.cache.get('1077310996495990875');
        channel.send(quote);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

module.exports = {
    autoQuotes,
}
