const axios = require('axios');

module.exports = {
  config: {
    name: 'sdxl',
    aliases: ['img'],
    version: '1.0',
    author: 'gojo',
    countDown: 0,
    role: 0,
    longDescription: {
      en: 'Text to Image'
    },
    category: 'ai',
    guide: {
      en: `{pn} prompt and here is models u can choose
1 | DreamshaperXL10
2 | DynavisionXL
3 | JuggernautXL
4 | RealismEngineSDXL
5 | Sdxl 1.0`
    }
  },

  onStart: async function ({ message, api, args, event }) {
    const text = args.join(' ');

    if (!text) {
      return message.reply("😡Please provide a prompt with models");
    }

    const [prompt, model] = text.split('|').map((text) => text.trim());
    const puti = model || "2";
    const baseURL = `https://sandipapi.onrender.com/sdxl?prompt=${prompt}&model=${puti}`;
    api.setMessageReaction("⏳", event.messageID, () => {}, true);

    message.reply("✅| Generating please wait.", async (err, info) => {
      message.reply({ 
body: `✅`,
        attachment: await global.utils.getStreamFromURL(baseURL)
      });
      let ui = info.messageID;
      message.unsend(ui);
      api.setMessageReaction("✅", event.messageID, () => {}, true);
    });
  }
};