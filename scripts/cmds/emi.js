const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "emi",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Deku",
    description: "Generate image in emi",
    commandCategory: "AI",
    usages: "[prompt]",
    cooldowns: 5,
    permissions: []
  },

  onStart: async function({ api, event, args }) {
    function r(msg) {
      api.sendMessage(msg, event.threadID, event.messageID);
    }

    let url = "https://ai-tools.replit.app";
    let f = path.join(__dirname, 'cache', 'emi.png');

    if (!args[0]) return r('Missing prompt!');

    const a = args.join(" ");
    if (!a) return r('Missing prompt!');

    try {
      const d = (await axios.get(url + '/emi?prompt=' + a, {
        responseType: 'arraybuffer'
      })).data;
      fs.writeFileSync(f, Buffer.from(d, "utf8"));
      return r({ attachment: fs.createReadStream(f, () => fs.unlinkSync(f)) });
    } catch (e) {
      return r(e.message);
    }
  }
};