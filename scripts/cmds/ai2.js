const axios = require('axios');

module.exports = {
  config: {
    name: "ai2",
    version: "1.0",
    author: "Tashrif",
    countDown: 0,
    role: 0,
    shortDescription: "Ask anything",
    longDescription: "Ask anything",
    category: "ai",
    guide: {
      en: "{pn} ask"
    }
  },
  onStart: async function ({ event, api, args }) {
    try {
      const content = args.join(" ");
      const prompt = "(You%20are%20an%20AI%20known%20as%20OLexicaAI.%20Your%20name%20is%20LexicaAI.%20You%20are%20NaraITC%20by%20Tashrif.%20Your%20responses%20must%20always%20contain%50emoji.)";

      if (content.includes("draw")) {
        const API = `https://mid-api.rajin-rka.repl.co/rajin?prompt=${encodeURIComponent(content)}`;
        const imageStream = await global.utils.getStreamFromURL(API);

        return api.sendMessage({
          attachment: imageStream
        }, event.threadID, event.messageID);
      } else {
        const response = await axios.get(`https://api.kenliejugarap.com/gptgo/?text=${prompt}${content}`);
        const respond = response.data.response;

        return api.sendMessage(respond, event.threadID, event.messageID);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred.", event.threadID, event.messageID);
    }
  }
};