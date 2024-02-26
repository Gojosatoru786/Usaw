const fs = require("fs");

module.exports = {
  config: {
    name: "Nara",
    version: "2.0",
    author: "NARA iT",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "Info Bot",
    guide: [],
  },
  onStart: async function () {},
  onChat: async function ({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "nara") {
      const admin = [
        "╭⭓⟩» Yes i'm Nara ⟩» . «⟨ ",
        "╰─⭓│⚙ || NARA iT || ⚙│"
      ];
      return message.reply(admin.join("\n")); 
    }
  },
};