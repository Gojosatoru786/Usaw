module.exports = {
  config: {
    name: 'balance',
    aliases: [],
    version: '1.0',
    role: 0,
    countDown: 5,
    author: 'edinst',
    shortDescription: 'example',
    longDescription: 'example',
    category: 'command',
    guide: { en: 'balance: "you have %1" ' }
  },
  onStart: function ({ message, event, getLang, api }) {
    message.reply(getLang("balance"));
  }
};