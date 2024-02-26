const axios = require('axios');

module.exports = {
  config: {
    name: "tai",
    version: "1.0",
    author: "OtinXSandip",
    countDown: 5,
    role: 2,
    shortDescription: "horny AI",
    longDescription: "horny AI",
    category: "chat",
    guide: {
      en: "{pn} text"
    }
  },
  onStart: async function ({ message, args, api, event, commandName, usersData }) {
    const a = "nemobot";
    const b = "otinxshiva10";
    const id = event.senderID;
    const userData = await usersData.get(id);
    const name = userData.name;
    const reply = [{ id, tag: `${name}` }];

    const senderID = event.senderID;
    const text = args.join(' ');
    if (!text) return message.reply(`yes son of a bitch🖕😡`, event.threadID, event.messageID);
    api.setMessageReaction("🗿", event.messageID, () => { }, true);
    try {
      const response = await axios.get(`https://${a}.${b}.repl.co/deepam?text=${text}`);
      api.setMessageReaction("😍", event.messageID, () => { }, true);
      message.reply({
        body: `${reply[0].tag}, ${response.data.answer}`,
        mentions: reply
      }, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName,
          messageID: info.messageID,
          author: event.senderID
        });
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  },
  onReply: async function ({ message, event, Reply, args, api, usersData }) {
    const a = "nemobot";
    const b = "otinxshiva10";
    const id = event.senderID;
    const userData = await usersData.get(id);
    const name = userData.name;
    const reply = [{ id, tag: `${name}` }];
    const { author, commandName, messageID } = Reply;
    if (event.senderID != author) return;
    api.setMessageReaction("🗿", event.messageID, () => { }, true);
    try {
      const text = args.join(" ");
      const response = await axios.get(`https://${a}.${b}.repl.co/deepam?text=${text}`);
      api.setMessageReaction("😍", event.messageID, () => { }, true);
      message.reply({
        body: `${reply[0].tag},${response.data.answer}`,
        mentions: reply
      }, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName,
          messageID: info.messageID,
          author: event.senderID
        });
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};