const axios = require('axios');

module.exports = {
  config: {
    name: 'coffee',
    version: '1.0',
    author: 'Finn',
    role: 0,
    longDescription: 'Send a random coffee image',
    category: 'fun',
    guide: {en:'{p}coffee'},
  },

  onStart: async function ({ api, event }) {
    try {
      const apiUrl = 'https://coffee.alexflipnote.dev/random.json';
      const response = await axios.get(apiUrl);
      const coffeeImageUrl = response.data.file;
      const caption = 'Enjoy a cup of coffee! ☕';
      api.sendMessage({ attachment: await global.utils.getStreamFromURL(coffeeImageUrl), body: caption }, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage('An error occurred while fetching the coffee image.', event.threadID);
    }
  },
};