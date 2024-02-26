const axios = require('axios');

module.exports = {
  config: {
    name: 'duck',
    version: '1.0',
    author: 'Finn',
    role: 0,
    longDescription: 'Send a random duck image',
    category: 'fun',
    guide: {en:'{p}duck'},
  },

  onStart: async function ({ api, event }) {
    try {
      const apiUrl = 'https://random-d.uk/api/v2/random';
      const response = await axios.get(apiUrl);
      const duckImageUrl = response.data.url;
      const caption = 'Quack quack! 🦆';
      api.sendMessage({ attachment: await global.utils.getStreamFromURL(duckImageUrl), body: caption }, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage('An error occurred while fetching the duck image.', event.threadID);
    }
  },
};