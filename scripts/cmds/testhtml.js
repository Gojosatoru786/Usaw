const { JSDOM } = require('jsdom');
const { createCanvas } = require('canvas');
const fs = require('fs');

module.exports = {
  config: {
    name: "testhtml",
    aliases: [],
    version: "1.0",
    author: "EDINST",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "Test HTML Code"
    },
    longDescription: {
      en: "Execute HTML code and provide response based on content type."
    },
    category: "games",
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
      const htmlCode = args.join(' ');

      if (!htmlCode) {
        return api.sendMessage("Please provide HTML code.", event.threadID);
      }

      // Create a DOM environment to execute the HTML code
      const dom = new JSDOM(`<!DOCTYPE html><html><body>${htmlCode}</body></html>`);
      const document = dom.window.document;

      // Check if the content is text or image
      if (document.querySelector('img')) {
        // If it contains an image, send the image file
        const canvas = createCanvas(400, 400);
        const ctx = canvas.getContext('2d');

        // Draw your image here
        // Example: ctx.drawImage(myImage, 0, 0);

        const imageBuffer = canvas.toBuffer('image/png');
        fs.writeFileSync('output.png', imageBuffer);

        api.sendMessage({
          attachment: fs.createReadStream('output.png')
        }, event.threadID);
      } else {
        // If it's not an image, send the text content
        const textContent = document.body.textContent.trim();
        api.sendMessage(textContent, event.threadID);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while processing the HTML code.", event.threadID);
    }
  }
};