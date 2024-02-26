module.exports = {
  config: {
    name: "testgpt",
    aliases: ["gpt-45"],
    version: "1.0",
    author: "EDINST",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "An AI chat module using GPT"
    },
    longDescription: {
      en: "This module allows the bot to chat using GPT AI model."
    },
    category: "ai chat",
    guide: {
      en: "To use the GPT module, simply type `.gpt <question>`."
    }
  },
  langs: {
    en: {
      gg: ""
    }
  },

  onStart: async function({ api, event, args, message }) {
    try {
      const axios = require("axios");
      const apiUrl = "https://gpt.ainz-sama101.repl.co/gpt";
      const question = args.join(" ");

      if (!question) {
        api.sendMessage("Please provide a question.", event.threadID);
        return;
      }

      const response = await axios.get(apiUrl, {
        params: {
          prompt: question
        }
      });

      const answer = response.data.answer;

      api.sendMessage(answer, event.threadID);
    } catch (err) {
      console.error("Error:", err);
    }
  }
};