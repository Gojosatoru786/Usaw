const LuxionCMD = {
  config: {
    name: "coin",
    version: "1.0",
    author: "Lyethilf Luxion", //jangan diubah
    countDown: 5,
    role: 0,
    sortDescription:" ",
    longDescription: "bermain lempar coin",
    category: "command",
    guide: "{pn}"
  },
  onStart: async function({api, message, args, event}) {
    const koin = ["Depan", "Belakang"];
    const flip = Math.floor(Math.random() * koin.length)
    const result = koin[flip];
    const information = "gunakan coin flip untuk melempar koin.\n kamu bisa menggunakan ini untuk taruhan dengan teman";
    const invalid = "kamu salah menggunakan perintah.\nKetik coin info\nUntuk Melihat Cara Penggunaan";
   const LuxionCoin = (args[0]);
    switch (LuxionCoin) {
    case "flip":{
      api.sendMessage("kamu melempar koin.\nKamu Mendapatkan:\x20"+result, event.threadID);
      break;
    }
    case "info":
      case "information": {
      api.sendMessage(information, event.threadID);
      break;
    }
    default: {
        api.sendMessage(invalid, event.threadID);
        break;
      }
    }
  }
};
module.exports = LuxionCMD