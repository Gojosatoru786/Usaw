const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "upt",
    aliases: ["upt"],
    author: "GojoXRimon", // idea and half code  from  coded by kshitiz 
    version: "2.0",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: "get bot owner info"
    },
    category: "owner",
    guide: {
      en: "{p}{n}"
    }
  },
  onStart: async function ({ api, event }) {
    try {
      const loadingMessage = "Loading Bot 🤖 Uptime...";
      await api.sendMessage(loadingMessage, event.threadID);

      const ownerInfo = {
        name: 'Rimon x Gojo',
      };

      const currentTime = new Date();
      const formattedTime = formatTime(currentTime);

      const videoUrl = `https://drive.google.com/uc?export=download&id=1-daMabdDqNeC9UkodplyYv2Tkt8N5uKt&time=${formattedTime}`;
      const tmpFolderPath = path.join(__dirname, 'tmp');

      if (!fs.existsSync(tmpFolderPath)) {
        fs.mkdirSync(tmpFolderPath);
      }

      const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
      const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

      fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

      const response = `
        𝗼𝘄𝗻𝗲𝗿 & 𝗯𝗼𝘁𝘂𝗽𝘁 𝗶𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻:
    𓃝 | Name: ${ownerInfo.name}
     🤖 | Bot Uptime: ${formattedTime}
      `;

      await api.sendMessage({
        body: response,
        attachment: fs.createReadStream(videoPath)
      }, event.threadID);
    } catch (error) {
      console.error('Error in owner command:', error);
      api.sendMessage('An error occurred while processing the command.', event.threadID);
    }
  },
  onChat: async function ({ api, event }) {
    try {
      const lowerCaseBody = event.body.toLowerCase();

      if (lowerCaseBody === "owner" || lowerCaseBody.startsWith("{p}owner")) {
        await this.onStart({ api, event });
      }
    } catch (error) {
      console.error('Error in onChat function:', error);
    }
  }
};

function formatTime(time) {
  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}