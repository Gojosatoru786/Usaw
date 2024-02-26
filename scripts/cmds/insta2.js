const axios = require('axios');
const fs = require('fs');

module.exports = {
  config: {
    name: "insta2",
    version: "1.0",
    author: "Rishad",
    countDown: 15,
    role: 0,
    shortDescription: "download Instagram video by link",
    longDescription: "download Instagram video",
    category: "𝗠𝗘𝗗𝗜𝗔",
    guide: "{pn} link"
  },

  onStart: async function ({ message, args }) {
    const link = args.join(" ");
    if (!link)
      return message.reply(`Please provide the link to the Instagram video.`);
    else {
      const BASE_URL = `https://for-devs.onrender.com/api/instadl?url=${encodeURIComponent(link)}&apikey=fuck`;

      message.reply("Processing your request... Please wait.");

      try {
        const res = await axios.get(BASE_URL);
        const videoUrl = res.data.video;

        if (videoUrl) {
          const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
          fs.writeFileSync(__dirname + '/cache/instaVideo.mp4', Buffer.from(videoResponse.data));
          const attachment = fs.createReadStream(__dirname + '/cache/instaVideo.mp4');
          await message.reply({ attachment });
        } else {
          message.reply(`Sorry, the Instagram video could not be downloaded.`);
        }
      } catch (e) {
        console.error(e);
        message.reply(`An error occurred while processing your request.`);
      }
    }
  }
};