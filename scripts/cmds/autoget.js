const fs = require('fs');

module.exports = {
  config: {
    name: "autoget",
    aliases: ["autog"],
    version: "1.0",
    author: "EDINST",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "Automatically get points for each message sent or received."
    },
    longDescription: {
      en: "This command allows you to automatically earn points for each message you send or receive. Points will be saved in the status.json file."
    },
    category: "ai chat",
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
      const statusData = fs.readFileSync("status.json");
      let status = JSON.parse(statusData);

      if (args[0] === "on") {
        status.push(event.senderID);
        fs.writeFileSync("status.json", JSON.stringify(status));
        api.sendMessage("Autoget poin sudah diaktifkan.", event.threadID);
      } else if (args[0] === "off") {
        const index = status.indexOf(event.senderID);
        if (index > -1) {
          status.splice(index, 1);
          fs.writeFileSync("status.json", JSON.stringify(status));
        }
        api.sendMessage("Autoget poin sudah dinonaktifkan.", event.threadID);
      } else {
        api.sendMessage("Harap gunakan .autoget on atau .autoget off.", event.threadID);
      }
    } catch (err) {
      console.log(err);
      api.sendMessage("Terjadi kesalahan. Mohon coba lagi nanti.", event.threadID);
    }
  },

  onMessage: async function({ api, event, message }) {
    try {
      const statusData = fs.readFileSync("status.json");
      let status = JSON.parse(statusData);

      if (status.includes(event.senderID)) {
        const statusData = fs.readFileSync("status.json");
        let status = JSON.parse(statusData);
        if (!status[event.senderID]) {
          status[event.senderID] = 0;
        }
        status[event.senderID]++;
        fs.writeFileSync("status.json", JSON.stringify(status));

        api.sendMessage(`Poin Anda saat ini: ${status[event.senderID]}`, event.threadID);
      }
    } catch (err) {
      console.log(err);
    }
  }
};