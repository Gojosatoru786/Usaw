const fs = require("fs");

module.exports = {
  config: {
    name: "Admin List",
    version: "4",
    author: "NARA iT",
    countDown: 5,
    role: 0,
    shortDescription: "see admin bot",
    longDescription: "see admin bot",
    category: "Info Bot",
    guide: [],
  },
  onStart: async function () {},
  onChat: async function ({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "admin list") {
      const admin = [
        "╭─────────────⭓",
        "├─ ⭔ADMIN BOT⭔",
        "│ ⭔⟩» Bernando Gaming",
        "│ ⭔⟩» Luxion",
        "│ ⭔⟩» Edi",
        "├─────────────⭔",
        "╰─────────────⭓",
      ];
      return message.reply(admin.join("\n"));
    }
  },
};