const PastebinAPI = require('pastebin-js');
const request = require('request');

module.exports = {
  config: {
    name: "scraper",
    version: "1.5",
    author: "Subash",
    countDown: 1,
    role: 2,
    shortDescription: {
      en: "Web Scraper"
    },
    longDescription: {
      en: "This command scrapes a web page and uploads the data to Pastebin."
    },
    category: "general",
    guide: {
      en: "{pn} <url>"
    }
  },

  onStart: async function({ api, event, args }) {
    const subash = ['100090659982866'];

    if (!subash.includes(event.senderID)) {
      return api.sendMessage("❌ | You don't have the access!", event.threadID, event.messageID);
    }

    const pastebin = new PastebinAPI({
      api_dev_key: 'LFhKGk5aRuRBII5zKZbbEpQjZzboWDp9',
      api_user_key: 'LFhKGk5aRuRBII5zKZbbEpQjZzboWDp9',
    });

    const url = args[0];

    request.get({
      url: `https://api.api-ninjas.com/v1/webscraper?url=${url}`,
      headers: {
        'X-Api-Key': 'Sqhf/Iy0PmjmklQNnCjFyg==QUfLuwFxhSh3aJSm',
      },
    }, async function(error, response, body) {
      if (error) return console.error('Request failed:', error);
      else if (response.statusCode !== 200) return console.error('Error:', response.statusCode, body.toString('utf8'));

      const scrapedData = body;

      const paste = await pastebin
        .createPaste({
          text: scrapedData,
          title: 'Web Scraper Result',
          format: null,
          privacy: 1,
        })
        .catch((error) => {
          console.error(error);
        });

      const rawPaste = paste.replace("pastebin.com", "pastebin.com/raw");

      api.sendMessage(`Web scraping completed. Data saved to: ${rawPaste}`, event.threadID, event.messageID);
    });
  },
};