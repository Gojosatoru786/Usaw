const axios = require('axios');

module.exports = {
  config: {
    name: "waifu",
    aliases: ["w"],
    version: "1.0",
    author: "EDINST",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "Get a random waifu image."
    },
    longDescription: {
      en: "This command will fetch a random waifu image using the Waifu.pics API."
    },
    category: "games",
    guide: {
      en: ""
    }
  },

  onStart: async function({ api, event, args, message }) {
    try {
      const response = await axios.get('https://api.waifu.pics/sfw/waifu');
      const imageUrl = response.data.url;
      
      message.reply({
        attachment: axios({
          url: imageUrl,
          method: 'GET',
          responseType: 'arraybuffer'
        }),
        body: 'Random waifu image:'
      }, event.threadID, (error, info) => {
        if (error) console.error(error);
      });
    } catch (error) {
      console.error(error);
    }
  }
};