const fs = require("fs");

module.exports = {
  config: {
    name: "Bot - Team",
    version: "1.3",
    author: "Nishimiya",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "NARA iT",
    guide: {
    }
  },

  langs: {
    en: {
      botteam: "╭─────────────⭓\n├─ ⭔Nishimiya ⭔\n│ » 1. Nishimiya\n│ » 2. Vern Shizui \n├─────────────⭔\n╰─────────────⭓"
    }
  },

  onStart: async function () {},
  onChat: async function ({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "bot team")
      return () => {
        return message.reply(getLang("botteam"));
      };
  }
};