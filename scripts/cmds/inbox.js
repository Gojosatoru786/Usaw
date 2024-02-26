module.exports = {
  config: {
    name: "inbox",
    aliases: ["inboxme"],
    version: "1.0",
    author: "EDINST",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: ""
    },
    category: "fun",
    guide: {
      en: ""
    }
  },
  langs: {
    en: {
      gg: ""
    },
    id: {
      gg: ""
    }
  },
  onStart: async function({ api, event, args, message }) {
    try {
      const query = encodeURIComponent(args.join(' '));
      message.reply("ok", event.threadID);
      api.sendMessage("hello bro", event.senderID);
    } catch (error) {
      console.error("Error bro: " + error);
    }
  }
};