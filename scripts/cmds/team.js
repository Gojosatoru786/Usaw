const fs = require("fs");

module.exports = {
  config: {
    name: "Team",
    version: "1.0",
    author: "NARA iT",
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
      team: "╭─────────────⭓\n├─ ⭔TEAM Nishimiya⭔\n│ ⟩» 1. Bernando Gaming \n├─────────────⭔\n╰─────────────⭓"
    }
  },

  onStart: async function () {},
  onChat: async function ({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "team")
      return () => {
        return message.reply(getLang("team"));
      };
  }
};