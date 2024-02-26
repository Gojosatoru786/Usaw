const axios = require('axios');

const API_KEY = "LFhKGk5aRuRBII5zKZbbEpQjZzboWDp9";

module.exports = {
  config: {
    name: "bintotext",
    version: "1.0",
    author: "edinst",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "Utility",
    guide: [],
  },
  onStart: async function () {},
  onChat: async function ({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase().startsWith(".bintotext")) {
      const args = event.body.split(" ");
      if (args.length === 2) {
        const link = args[1];
        try {
          const response = await axios.get(link, {
            headers: {
              "X-API-Key": API_KEY,
            },
          });
          const text = response.data;
          message.reply(text);
        } catch (error) {
          message.reply("Gagal mengambil teks dari link Pastebin.");
        }
      } else {
        message.reply("Format penggunaan salah. Contoh: .bintotext <link Pastebin>");
      }
    }
  },
};