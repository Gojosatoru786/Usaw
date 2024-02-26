const catNames = require('cat-names');

module.exports = {
  config: {
    name: "randomcatname",
    aliases: ["catname"],
    version: "1.0",
    author: "Riley",
    shortDescription: "Get a random cat name",
    longDescription: "Get a random cat name for your feline friend.",
    category: "fun",
    guide: { en: "{pn} " },
  },
  onStart: function ({ message }) {
    const randomCatName = catNames.random();
    message.reply(`Here's a random cat name:\n${randomCatName}`);
  },
};