const axios = require("axios");
const fs = require("fs-extra");
const os = require("os");
const yts = require("yt-search");
const ytdl = require("@distube/ytdl-core");

module.exports = {
  sentVideos: [],
  playlists: {
    "playlist1": "PLaPLzpOlr3JSGd0fFH1jpBeZ9-mMeUQ-P",
    "playlist2": "PL9iXyZ7BC0plLlV-FQdpkUv0KaLyRwgmh",
    "playlist3": "PLoCqah2yZ7RI2diRqvJ-TAM6w_UpkgSVa",
    "playlist4": "PLK3BZE3cGU6jHgTJY9b2edPw163WUzb7a",
    "playlist5": "PLK3BZE3cGU6h2nIXa0yZHHX_qWtsfwdnc",
    "playlist6": "PLDHnEFiZUKKNVFlbQgzHv5GvL2hHwgew5",
    "playlist7": "PLdK4_hMpzJgTtBwbiScTsuvmKbJMeJXLx",
    // Add more playlists as needed
  },

  config: {
    name: "aniedit",
    version: "3.0",
    role: 0,
    author: "𝗞𝘀𝗵𝗶𝘁𝗶𝘇 & 𝗦𝗞𝗬",
    cooldowns: 30,
    shortDescription: "Fetch a random video from a YouTube playlist and send it",
    longDescription: "",
    category: "video",
    dependencies: {
      "fs-extra": "",
      "axios": "",
      "ytdl-core": "",
      "yt-search": ""
    }
  },

  onStart: async function ({ api, event, message }) {
    try {
      const senderID = event.senderID;

      const loadingMessage = await api.sendMessage("𝗟𝗼𝗮𝗱𝗶𝗻𝗴 𝗿𝗮𝗻𝗱𝗼𝗺 𝗮𝗻𝗶𝗺𝗲 𝘃𝗶𝗱𝗲𝗼..💫", event.threadID, null, event.messageID);

      const apiKey = "AIzaSyAO1tuGus4-S8RJID51f8WJAM7LXz1tVNc";

      // Get random playlist
      const playlists = Object.values(this.playlists);
      const randomPlaylistId = playlists[Math.floor(Math.random() * playlists.length)];

      const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&playlistId=${randomPlaylistId}&part=contentDetails&maxResults=50`;
      const response = await axios.get(playlistUrl);

      const items = response.data.items;
      const videoIds = items.map((item) => item.contentDetails.videoId);

      if (this.sentVideos.length === videoIds.length) {
        this.sentVideos = [];
      }

      const unwatchedVideoIds = videoIds.filter((videoId) => !this.sentVideos.includes(videoId));

      if (unwatchedVideoIds.length === 0) {
        api.unsendMessage(loadingMessage.messageID);
        return api.sendMessage("No unwatched videos left.", event.threadID, null, event.messageID);
      }

      let selectedVideoId = null;
      for (const videoId of unwatchedVideoIds) {
        // Check video size
        const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoId}&part=contentDetails`;
        const videoResponse = await axios.get(videoDetailsUrl);
        const videoDuration = videoResponse.data.items[0].contentDetails.duration;
        const durationInSeconds = parseDuration(videoDuration);
        if (durationInSeconds <= 600) { // Check if duration is less than or equal to 10 minutes (600 seconds)
          selectedVideoId = videoId;
          break;
        }
      }

      if (!selectedVideoId) {
        api.unsendMessage(loadingMessage.messageID);
        return api.sendMessage("No suitable videos found (videos are larger than 10 minutes).", event.threadID, null, event.messageID);
      }

      this.sentVideos.push(selectedVideoId);

      const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${selectedVideoId}&part=snippet`;
      const videoResponse = await axios.get(videoDetailsUrl);

      const videoInfo = videoResponse.data.items[0].snippet;

      const randomVideoTitle = videoInfo.title;

      const cacheFilePath = os.tmpdir() + "/randomVideoTitle.txt";
      fs.writeFileSync(cacheFilePath, randomVideoTitle);

      const searchResults = await yts(randomVideoTitle);

      if (!searchResults.videos.length) {
        api.unsendMessage(loadingMessage.messageID);
        return api.sendMessage("No video found based on the cached title.", event.threadID, null, event.messageID);
      }

      const foundVideo = searchResults.videos[0];
      const videoUrl = foundVideo.url;

      const stream = ytdl(videoUrl, { filter: "audioandvideo" });
      const fileName = `${senderID}.mp4`;
      const filePath = __dirname + `/cache/${fileName}`;

      stream.pipe(fs.createWriteStream(filePath));

      stream.on('response', () => {
        console.info('[DOWNLOADER]', 'Starting download now!');
      });

      stream.on('info', (info) => {
        console.info('[DOWNLOADER]', `Downloading video: ${info.videoDetails.title}`);
      });

      stream.on('end', () => {
        console.info('[DOWNLOADER] Downloaded');

        if (fs.statSync(filePath).size > 26214400) {
          fs.unlinkSync(filePath);
          // Select another video if the file size is too large
          return this.onStart({ api, event, message });
        }

        const message = {
          body: `📹 | 𝗛𝗲𝗿𝗲'𝘀 𝘁𝗵𝗲 𝗿𝗮𝗻𝗱𝗼𝗺 𝗮𝗻𝗶𝗺𝗲 𝘃𝗶𝗱𝗲𝗼 \n\n🔮 | 𝗧𝗶𝘁𝗹𝗲: ${randomVideoTitle}\n⏰| 𝗗𝘂𝗿𝗮𝘁𝗶𝗼𝗻: ${foundVideo.duration.timestamp}`,
          attachment: fs.createReadStream(filePath)
        };

        api.sendMessage(message, event.threadID, null, event.messageID, () => {
          fs.unlinkSync(filePath);
        });

        setTimeout(() => {
          api.unsendMessage(loadingMessage.messageID);
        }, 10000);
      });
    } catch (error) {
      console.error('[ERROR]', error);
      api.sendMessage('An error occurred while processing the command.', event.threadID, null, event.messageID);
    }
  },
};

// Function to parse duration from ISO 8601 format
function parseDuration(duration) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;

  return hours * 3600 + minutes * 60 + seconds;
}