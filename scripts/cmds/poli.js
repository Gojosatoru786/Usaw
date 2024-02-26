const fs = require('fs');
const axios = require('axios');

module.exports = {
  config: {
    name: "poli",
    aliases: ["pai"],
    version: "1.0",
    author: "Riley",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "Generate an image from a prompt"
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

  onStart: async function ({ api, event, args, message }) {
    try {
      const prompt = args.join(' ');

      if (!prompt) {
        return message.reply('Please provide a prompt.');
      }

      const encodedPrompt = encodeURIComponent(prompt);
      const providedURL = `https://image.pollinations.ai/prompt/${encodedPrompt}`;
      
      const response = await axios.get(providedURL, { responseType: 'stream' });

      return new Promise((resolve, reject) => {
        const filePath = 'image.jpg';
        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);
        writer.on('finish', () => {
          const imageStream = fs.createReadStream(filePath);
          message.reply({
            body: 'Here is the image:',
            attachment: imageStream
          }, event.threadID, (err, messageId) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              resolve(messageId);
            }
            fs.unlinkSync(filePath); // Remove the temporary image file
          });
        });
        writer.on('error', reject);
      });
      
    } catch (error) {
      console.error(error);
      return message.reply('An error occurred while generating the image.');
    }
  }
};