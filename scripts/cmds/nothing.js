module.exports = {
  config: {
    name: "..",
    version: "1.1",
    author: "NARA iT",
    countDown: 0,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "nothing",
    guide: [],
  },
  onStart: async function ({ event, message }) {
    await message.reply("What's?");
  },
};