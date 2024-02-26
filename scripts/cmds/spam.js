module.exports = {
  config: {
    name: 'spam',
    aliases: [],
    version: '1.0',
    role: 0,
    author: 'YourName',
    shortDescription: 'example',
    longDescription: 'example',
    category: 'command',
    guide: { en: '' }
  },
  onStart: async function ({ message, event, api }) {
    for (let i = 0; i < 10; i++) {
      await sendMessageWithDelay(api, message.senderID, `Ini adalah pesan ke-${i + 1}`);
      await sleep(1000); // Jeda selama 1 detik (1000 ms)
    }
  }
};