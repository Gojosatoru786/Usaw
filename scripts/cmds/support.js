module.exports = {
  config: {
    name: "support",
    version: "1.0",
    author: "Lyethilf Luxion", //jangan diubah ya sayang
    countDown: 30,
    Role: 0,
    shortDescription: "support nara",
    longDescription: "support nara",
    category: "support",
    guide: "{pn} join atau leave",
  },
  onStart: async function ({args, message, event, api, usersData}) {
    const leave = "kamu telah keluar dari support group.";
    const fsx = "Kamu tela dimsukan dalam supportgc";

    switch (args[0]) {
      case "join":
case "group":
case "gc": {
        api.sendMessage(fsx, event.threadID);
api.addUserToGroup(event.senderID, event.boxID = 5976683912353209);
api.sendMessage("user berhasil dimasukan kedalam support gc", event.boxID = 5976683912353209);
        break;
      }
      case "leave": 
case "out": 
case "keluar": {
        api.sendMessage(leave, event.senderID);
api.removeUserFromGroup(event.senderID, event.boxID = 6902104319871937);
api.sendMessage("user keluar dari support group", event.boxID = 6902104319871937);
        break;
      }
      default: {
        api.sendMessage("gunakan join atau leave.", event.threadID);
        break;
      }
    }
  },
};