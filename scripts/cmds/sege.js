const segeaiv2 = require('segeaiv2');
const axios = require('axios');

//Degraded

module.exports = {
  config: {
    name: 'sege',
    version: '1.0',
    author: 'Samir Œ',
    countDown: 5,
    role: 0,
    shortDescription: 'sarcasm',
    longDescription: 'Utility',
    category: 'seen',
  },

  onStart: async ({ api, event, args }) => {
    if (args.length < 1) {
      return api.sendMessage('Please provide a question.', event.threadID);
    }

    const question = args.join(' ');

    segeaiv2(question, (error, response) => {
      if (error) {
        console.error('Error while making the Segeaiv2 API request:', error);
        api.sendMessage('An error occurred while processing your question.', event.threadID);
      } else {
        const reply = response;

        api.sendMessage(reply, event.threadID, (err, info) => {
          if (!err) {
            global.GoatBot.onReply.set(info.messageID, {
              commandName: 'sege',
              messageID: info.messageID,
              author: event.senderID,
            });
          }
        });
      }
    });
  },

  onReply: async function ({ api, event, args, response }) {
    if (args.length < 1) {
      return api.sendMessage('Please provide a question.', event.threadID);
    }

    const question = args.join(' ');

    segeaiv2(question, (error, response) => {
      if (error) {
        console.error('Error while making the Segeaiv2 API request:', error);
        api.sendMessage('An error occurred while processing your question.', event.threadID);
      } else {
        const reply = response;

        api.sendMessage(reply, event.threadID, (err, info) => {
          if (!err) {
            global.GoatBot.onReply.set(info.messageID, {
              commandName: 'sege',
              messageID: info.messageID,
              author: event.senderID,
            });
          }
        });
      }
    });
  },
};
