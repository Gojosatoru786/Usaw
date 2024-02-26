module.exports = {
  config: {
    name: 'sange',
    aliases: [],
    version: '1.0',
    role: 0,
    countDown: 5,
    author: 'sange',
    shortDescription: 'sange',
    longDescription: 'sange',
    category: '18+',
    guide: { en: '' }
  },

  onStart: function () {},

  onChat: function ({ message, event, api }) {
    if (event.body && event.body.toLowerCase() === "sange") {
      const hitamPekat = ['perkosa aku dong Cid sayang😍', 'rahim ku gatal mas', 'ahhh😍😍 sini masukin'];
      const randomIndex = Math.floor(Math.random() * hitamPekat.length);
      const nigga = hitamPekat[randomIndex];
      api.sendMessage(nigga, event.threadID);
      api.setMessageReaction("💗", event.messageID);
    }
  }
};