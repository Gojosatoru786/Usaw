module.exports = {
  config: {
    name: "testjs",
    aliases: [],
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
    category: "tools",
    guide: {
      en: ""
    }
  },
  langs: {
    en: {
      gg: ""
    }
  },

  onStart: async function({ api, event, args, message }) {
    try {
      const code = args.join(" "); // Mengambil kode JavaScript dari argumen

      const result = eval(`(${code})`); // Menjalankan kode JavaScript

      message.reply({
        body: result.toString(),
        mentions: [
          {
            tag: message.senderID,
            id: message.senderID,
            fromIndex: result.indexOf(message.senderID),
            toIndex: result.indexOf(message.senderID) + message.senderID.length
          }
        ]
      }, event.threadID); // Mengirimkan hasil reaksi

    } catch (error) {
      api.sendMessage({
        body: "Terjadi kesalahan dalam menjalankan kode JavaScript!"
      }, event.threadID); // Mengirim pesan error jika terjadi kesalahan
    }
  }
};