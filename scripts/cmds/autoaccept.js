const axios = require('axios');

let isAutoAcceptEnabled = true;

module.exports = {
  config: {
    name: "autoacp",
    aliases: ["acp"],
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
      en: "Use this command to enable or disable auto accept friends request on your Facebook bot account"
    }
  },
  langs: {
    en: {
      gg: "Auto accepting friends request..."
    }
  },

  onStart: async function({ api, event, args, message }) {
    try {
      if (args[0] === "on") {
        if (isAutoAcceptEnabled) {
          api.sendMessage("Auto accept friend request is already enabled.", event.threadID);
          return;
        }
        isAutoAcceptEnabled = true;
        api.sendMessage("Auto accept friend request is now enabled.", event.threadID);
      } else if (args[0] === "off") {
        if (!isAutoAcceptEnabled) {
          api.sendMessage("Auto accept friend request is already disabled.", event.threadID);
          return;
        }
        isAutoAcceptEnabled = false;
        api.sendMessage("Auto accept friend request is now disabled.", event.threadID);
      } else {
        api.sendMessage("Invalid argument. Use 'on' or 'off' to enable or disable auto accept friend request.", event.threadID);
      }
    } catch (error) {
      console.log(error);
      api.sendMessage("An error occurred.", event.threadID);
    }
  },

  onFriendRequest: async function({ api, event }) {
    try {
      if (isAutoAcceptEnabled) {
        await api.acceptFriendRequest(event.senderID);
      }
    } catch (error) {
      console.log(error);
    }
  }
};