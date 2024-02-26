const axios = require('axios');

module.exports = {
  config: {
    name: "gllama",
    version: "1.0",
    author: "rehat-- & Aliester Crowley",
    countDown: 10,
    role: 0,
    longDescription: "Extremely fast Llama 2 70b model by GroqChat with over 200 tokens per second.",
    category: "ai",
    guide: {
      en: "{pn} <query>"
    }
  },
  onStart: async function ({ message, event, api, args }) {
    try {
      const prompt = args.join(" ");
      const llm = encodeURIComponent(prompt);
      api.setMessageReaction("âŒ›", event.messageID, () => { }, true);

      const startTime = new Date();

      const res = await axios.get(`https://llama.aliestercrowley.com/api?prompt=${llm}`);
      const result = res.data.response;
      api.setMessageReaction("âœ…", event.messageID, () => { }, true);

      const endTime = new Date();
      const elapsedTime = (endTime - startTime) / 1000;

      const wordCount = result.trim().split(/\s+/).filter(word => word !== '').length;

      message.reply({
        body: `${result}\n\nCompletion Speed: ${elapsedTime} seconds\nTotal words: ${wordCount}`,
      });
    } catch (error) {
      console.error(error);
      api.setMessageReaction("âŒ", event.messageID, () => { }, true);
    }
  }
};