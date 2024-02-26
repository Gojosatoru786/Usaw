module.exports = {
  config: {
    name: "gettext",
    version: "1.0",
    author: "AceGun",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: {
      en: ".",
    },
    category: "media",
    guide: {
      en: "{pn} <reply with text>",
    },
  },

  onStart: async function ({ api, event, gettext }) { // Change getText to gettext
    const { messageReply } = event;

    if (event.type !== "message_reply") {
      return api.sendMessage("Please reply to a text message.", event.threadID, event.messageID);
    }

    const text = await gettext(messageReply.messageID); // Change getText to gettext
    return api.sendMessage(text, event.threadID);
  }
};