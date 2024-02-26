const axios = require('axios');

module.exports = {
  config: {
    name: "ix",
    aliases: ["ix"],
    version: "1.1",
    author: "Samir Œ",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: 'Text to Image'
    },
    longDescription: {
      en: "Text to image"
    },
    category: "image",

  },

  onStart: async function({ message, args }) {
    const text = args.join(" ");
    if (!text) {
      return message.reply("Please provide a prompt.");
    }

    let prompt, model;
    if (text.includes("|")) {
      const [promptText, modelText] = text.split("|").map((str) => str.trim());
      prompt = promptText;
      model = modelText;
    } else {
      prompt = text;
      model = 1; 
    }

    message.reply("✅| Creating your Imagination...").then((info) => { id = info.messageID });
    try {
      const API = `https://api-samir.onrender.com/api/generateImage?style=${model}&prompt=${encodeURIComponent(prompt)}&aspectRatio=1:1`;
      const imageStream = await global.utils.getStreamFromURL(API);

      return message.reply({
        attachment: imageStream
      });
    } catch (error) {
      console.log(error);
      message.reply("Failed to generate your imagination.").then(() => {
        message.delete(id);
      });
    }
  }
};