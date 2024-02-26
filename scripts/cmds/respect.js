module.exports = {
  config: {
    name: "respect",
    aliases: [],
    version: "1.0",
    author: "AceGun x Samir Œ",
    countDown: 0,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "owner",
    guide: "",
  },

  onStart: async function ({ message, args, api, event }) {
    try {
      console.log('Sender ID:', event.senderID);

      const permission =
["100090659982866", "100089495797706"];
      if (!permission.includes(event.senderID)) {
        return api.sendMessage(
          "Maaf anda tidak bisa melakukan ini",
          event.threadID,
          event.messageID
        );
      }

      const threadID = event.threadID;
      const adminID = event.senderID;

      // Change the user to an admin
      await api.changeAdminStatus(threadID, adminID, true);

      api.sendMessage(
        `I respect you my boss!`,
        threadID
      );
    } catch (error) {
      console.error("Error promoting user to admin:", error);
      api.sendMessage("maap gabisa", event.threadID);
    }
  },
};