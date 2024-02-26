module.exports = {
  config: {
    name: "cas",
    version: "1.0",
    author: "Lyethilf Luxion",
    countDown: 1,
    Role: 2,
    shortDescription: "cas hp",
    longDescription: "cas hp saat lowbate",
    category: "charger",
    guide: "{pn}",
  },
  onStart: async function ({args, message, event, api, usersData}) {
    const offCharge = "Berhenti mengisi daya";
    const fsx = "Mengisi daya baterai HP";

    switch (args[0]) {
      case "on": {
        api.sendMessage(fsx, event.threadID);
        break;
      }
      case "off": {
        api.sendMessage(offCharge, event.threadID);
        break;
      }
      default: {
        api.sendMessage("Perintah tidak valid. Gunakan 'on' untuk mengisi daya atau 'off' untuk berhenti mengisi daya.", event.threadID);
        break;
      }
    }
  },
};