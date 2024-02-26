module.exports = {
  config: {
    name: "nokia",
    aliases: ["nokia"],
    version: "1.0",
    author: "kshitiz",
    shortDescription: "",
    longDescription: "",
    category: "fun",
    guide: "{pn} @mention/reply"
  },

  async onStart({ api, event, usersData }) {
    try {
      const mention = Object.keys(event.mentions);
      let imageLink = "";

      if (mention.length === 0) { 
        //replied user
     if(event.type == "message_reply");
        imageLink = await usersData.getAvatarUrl(event.messageReply.senderID);
      } else {
        //mentioned user
        const mentionedUserID = mention[0];
        imageLink = await usersData.getAvatarUrl(mentionedUserID);
      }

      const gifURL = `https://api.popcat.xyz/nokia?image=${encodeURIComponent(imageLink)}`;

      const message = {
        body: "bitch i am stylish🤣",
        attachment: [await global.utils.getStreamFromURL(gifURL)]
      };

      api.sendMessage(message, event.threadID, event.messageID);
    } catch (err) {
      console.error(err);
      api.sendMessage("please mention or reply to someone", event.threadID, event.messageID);
    }
  }
};