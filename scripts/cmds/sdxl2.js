const axios = require('axios');
const fs = require('fs');
const path = require('path');

const url = "https://ai-tools.replit.app";
const cacheDir = path.join(__dirname, 'cache');
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir);
}
const f = path.join(cacheDir, 'sdxl.png');

module.exports = {
  config: {
    name: "sdxl2",
    version: "1.0.0",
    hasPermssion: 0,
    Author: "gojoXRimon| Deku",
    description: "Generate image in sdxl",
    commandCategory: "AI",
    usages: "[prompt | style]",
    cooldowns: 0,
  },
  onStart: async function({ api, event, args }) {
    function r(msg) {
      api.sendMessage(msg, event.threadID, event.messageID);
    }

    const g = `•——[Style list]——•\n\n1. Cinematic\n2. Photographic\n3. Anime\n4. Manga\n5. Digital Art\n6. Pixel art\n7. Fantasy art\n8. Neonpunk\n9. 3D Model`;

    if (!args[0]) return r('Missing prompt and style\n\n' + g);

    const a = args.join(" ").split("|").map((item) => (item = item.trim()));
    const b = a[0];
    const c = a[1];

    if (!b) return r('Missing prompt!');
    if (!c) return r('Missing style!\n\n' + g);

    try {
      const d = (await axios.get(`${url}/sdxl?prompt=${b}&styles=${c}`, {
        responseType: 'arraybuffer'
      })).data;

      fs.writeFileSync(f, Buffer.from(d, "utf8"));
      return r({ attachment: fs.createReadStream(f) });
    } catch (e) {
      return r(e.message);
    }
  }
};