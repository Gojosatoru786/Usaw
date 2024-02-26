const axios = require('axios');

module.exports = {
  config: {
    name: "imgur",
    version: "1.0",
    author: "dipto X Mesbah Bb'e",//i just convert this command from mirai
    countDown: 5,
    role: 0,
    longDescription: {
      en: "upload your video and photo to imgur"
    },
    category: "𝗧𝗢𝗢𝗟'𝗦",

    description: "convert image/video into Imgur link",
    commandCategory: "tools",
    usages: "reply [image, video]"
  },

  onStart: async function ({ api, event }) {
    const dip = event.messageReply?.attachments[0]?.url;
    if (!dip) {
      return api.sendMessage('Please reply to an image or video.', event.threadID, event.messageID);
    }
    try {
      const res = await axios.get(`https://d1p-imgur.onrender.com/dip?url=${encodeURIComponent(dip)}`);
      const dipto = res.data.data;
         api.sendMessage(dipto, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      return api.sendMessage('Failed to convert image or video into link.', event.threadID, event.messageID);
    }
  }
};