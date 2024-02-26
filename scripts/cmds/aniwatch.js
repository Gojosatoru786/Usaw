const axios = require("axios");

async function fetchAnimeEpisodes(animeName) {
  try {
    const response = await axios.get(`https://anieps.onrender.com/kshitiz?anime=${encodeURIComponent(animeName)}`);
    return response.data.episodes;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch anime episodes");
  }
}

async function fetchEpisodeDownloadLinks(episodeName) {
  try {
    const response = await axios.get(`https://anidl.onrender.com/kshitiz?episode=${encodeURIComponent(episodeName)}`);
    return response.data.downloadLinks;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch episode download links");
  }
}

module.exports = {
  config: {
    name: "aniwatch",
    author: "Kshitiz",
    version: "1.0",
    cooldowns: 5,
    role: 0,
    shortDescription: "watch anime ",
    longDescription: "get anime episode download links",
    category: "Anime",
    guide: "{p}aniwatch <anime_name>",
  },

  onStart: async function ({ api, event, args }) {
    const animeName = args.join(" ");

    if (!animeName) {
      api.sendMessage({ body: "Please provide the name of the anime." }, event.threadID, event.messageID);
      return;
    }

    try {
      const episodes = await fetchAnimeEpisodes(animeName);

      if (!episodes || episodes.length === 0) {
        api.sendMessage({ body: `No episodes found for the anime: ${animeName}` }, event.threadID, event.messageID);
        return;
      }

      const totalEpisodes = episodes.length;
      const message = `Reply this message by episode number.\nTotal Episodes: ${totalEpisodes}`;

      api.sendMessage({ body: message }, event.threadID, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: "aniwatch",
          messageID: info.messageID,
          animeName,
          episodes,
        });
      });
    } catch (error) {
      console.error(error);
      api.sendMessage({ body: "Sorry, an error occurred while processing your request." }, event.threadID);
    }
  },

  onReply: async function ({ api, event, Reply, args }) {
    const { animeName, episodes } = Reply;

    const episodeIndex = parseInt(args[0], 10);

    if (isNaN(episodeIndex) || episodeIndex <= 0 || episodeIndex > episodes.length) {
      api.sendMessage({ body: "Invalid input.\nPlease provide a valid episode number." }, event.threadID, event.messageID);
      return;
    }

    const selectedEpisode = episodes[episodeIndex - 1];
    const episodeName = selectedEpisode[1];

    try {
      const downloadLinks = await fetchEpisodeDownloadLinks(episodeName);

      const message = `Download links for episode "${episodeName}":\n\n`
        + `𝟭𝟮𝟴𝟬𝘅𝟳𝟮𝟬: ${downloadLinks['1280x720']}\n`
        + `𝟭𝟵𝟮𝟬𝘅𝟭𝟬𝟴𝟬: ${downloadLinks['1920x1080']}`;

      api.sendMessage({ body: message }, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      api.sendMessage({ body: "An error occurred while processing the episode.\nPlease try again later." }, event.threadID);
    } finally {
      global.GoatBot.onReply.delete(event.messageID);
    }
  },
};