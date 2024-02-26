const axios = require('axios');

module.exports = {
  config: {
    name: "anime",
    aliases: ["animeArt"],
    version: "1.0",
    author: "Jarif maybe",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "Convert an image to anime art."
    },
    longDescription: {
      en: "This command allows you to convert an image to anime art using the provided API."
    },
    category: "image",
    guide: {
      en: "To use this command, simply type '.anime <image link>'."
    }
  },

  onStart: async function({ api, event, args, message }) {
    try {
      // Get the image URL
      const imgUrl = args[0];
      
      // Send a request to the API
      const response = await axios.get(`https://artv.odernder.repl.co/api/generateImage?imgurl=${imgUrl}&prompt=&model=`);
      
      // Get the generated anime image URL from the response
      const animeImgUrl = response.data.generatedImage;
      
      // Send the anime image as a reply
      api.sendMessage({ attachment: axios.get(animeImgUrl) }, event.threadID, () => {
        console.log("Anime art sent successfully.");
      });
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  }
};