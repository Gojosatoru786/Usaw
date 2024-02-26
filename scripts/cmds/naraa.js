module.exports = {
  config: {
    name: "naraa",
    aliases: [],
    version: "1.0",
    author: "rilson",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: ""
    },
    category: "ai chat",
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
      const axios = require('axios');
      const query = args.join(' ');
      const response = await axios.get(`https://poop.taoet897.repl.co/text?text=${encodeURIComponent(query)}`);
      const answer = response.data;

      api.sendMessage(answer, event.threadID);
    } catch (error) {
      console.error(error);
    }
  }
};