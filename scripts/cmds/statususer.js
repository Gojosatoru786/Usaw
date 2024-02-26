const fs = require('fs');

module.exports = {
  config: {
    name: "statususer",
    aliases: ["rank2", "status"],
    version: "1.0",
    author: "EDINST",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "Displays user's rank, name, UID, and rank points"
    },
    longDescription: {
      en: "This command displays the user's rank, name, UID, and rank points. Each message will add 1 rank point."
    },
    category: "ai chat",
    guide: {
      en: "Use command '.statususer' to get your rank and rank points."
    }
  },
  langs: {
    en: {
      gg: ""
    }
  },

  onStart: async function({ api, event, args, message }) {
    try {
      const statusData = fs.readFileSync('status.json');
      const rankData = JSON.parse(statusData);

      const userID = event.senderID;
      let foundUser = false;

      for (let i = 0; i < rankData.length; i++) {
        if (rankData[i].uid === userID) {
          const rank = i + 1;
          const userName = rankData[i].name;
          const userUID = rankData[i].uid;
          const rankPoints = rankData[i].points;

          api.sendMessage(`Your Rank: ${rank}\nName: ${userName}\nUID: ${userUID}\nRank Points: ${rankPoints}`, event.threadID);
          foundUser = true;
          break;
        }
      }

      if (!foundUser) {
        api.sendMessage('You are not ranked yet.', event.threadID);
      }
    } catch (err) {
      console.log(err);
    }
  }
};