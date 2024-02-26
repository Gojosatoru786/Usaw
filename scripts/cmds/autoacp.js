const axios = require('axios');

module.exports = {
  config: {
    name: "automaticaccept",
    aliases: ["autoacp"],
    version: "1.0",
    author: "edinst",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "Auto accept friends request on Facebook bot account"
    },
    longDescription: {
      en: "This command allows the bot to automatically accept friends request on its Facebook account"
    },
    category: "Facebook",
    guide: {
      en: "Use this command to enable auto accept friends request on your Facebook bot account"
    }
  },
  langs: {
    en: {
      gg: "Auto accepting friends request..."
    }
  },

  onStart: async function({ api, event, args, message }) {
    try {
      const accessToken = api.getCurrentAccessToken();
      const url = `https://graph.facebook.com/v12.0/me/friendrequests?access_token=${accessToken}`;

      const response = await axios.get(url);
      const friendRequests = response.data.data;

      if (friendRequests.length === 0) {
        api.sendMessage("No friend requests found.", event.threadID);
        return;
      }

      api.sendMessage("Auto accepting friends request...", event.threadID);

      for (const request of friendRequests) {
        await api.acceptFriendRequest(request.id);
        await sleep(1000);
      }

      api.sendMessage("All friend requests accepted.", event.threadID);
    } catch (error) {
      console.log(error);
      api.sendMessage("An error occurred while accepting friend requests.", event.threadID);
    }
  }
};