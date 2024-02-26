const axios = require('axios');

module.exports = {
  config: {
    name: "texttoimage",
    aliases: [],
    version: "1.0",
    author: "EDINST",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: ""
    },
    category: "games",
    guide: {
      en: ""
    }
  },
  langs: {
    en: {
      gg: ""
    }
  },

  onStart: async function({ api, event, args, message }) {
    try {
      const apiUrl = 'https://dalle-3.siam-apiproject.repl.co/generate';
      const text = message.body;
      
      const response = await axios.post(apiUrl, { text });
      const imageUrl = response.data.image;
      
      if (imageUrl) {
        api.sendMessage({
          attachment: fs.createReadStream(imageUrl),
          body: 'Here is the image generated from the text.'
        }, event.threadID);
      } else {
        api.sendMessage('Failed to generate the image.', event.threadID);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage('An error occurred while generating the image.', event.threadID);
    }
  }
};