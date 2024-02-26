const axios = require('axios');

module.exports = {
  config: {
    name: "gpt2",
    aliases: [],
    version: "1.0",
    author: "riley noson",
    countdown: 10,
    role: 0,
    shortdescription: { en: "simple ai" },
    longdescription: { en: "simple ai with gpt" },
    category: "ai chat",
    guide: { en: "{p}gpt2 <pertanyaan>" }
  },
  langs: {
    en: { gg: "" }
  },

  onStart: async function({ api, event, args, message }) {
    try {
      const query = encodeURIComponent(args.join(' '));
      api.sendMessage("Tunggu sebentar...", event.threadID, (err, info) => {
        if (!err) {
          axios.get(`https://poop.taoet897.repl.co/text?text=${query}`)
            .then(response => {
              const answer = response.data;
              api.sendMessage(answer, event.threadID, null, event.messageID);
              api.markAsRead(event.threadID);
            })
            .catch(error => {
              console.error(error);
            });
        } else {
          console.error(err);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
};