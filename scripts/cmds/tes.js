//CMD BY LYETHILF LUXION
const config = `database.config/{command}.js`
const LuxionCMD = {
  config: {
    name: "tes",
    version: "1.0",
    author: "Lyethilf Luxion",
    countDown: 5,
    Role: 0,
    shortDescription: "tes sesuatu",
    longDescription: "tes sesuatu seperti kulit, jenis kelamin, ras",
    category: "fun",
    guide: "{pn} <category>",
  },
  onStart: async function ({args, message, event, api, usersData}) {
    const kelamin = ["Laki-Laki", "Perempuan", "bencong", "tidak ada alat kelamin"];
const randomKelamin = Math.floor(Math.random() * kelamin.length);
const tipe = kelamin[randomKelamin];
    
    const kulit =["putih banget kamu", "putih", "lumayan putih", "masih putih", "coklat", "coklat kehitaman", "coklat banget", "lumayan hitam", "kamu hitam", "hitam banget", "hitam pekat", "raja negro", "raja negro kegelapan hitam pekat nigga black dark skin"];
    const randomSkin = Math.floor(Math.random() * kulit.length);
const warna = kulit[randomSkin];

const ras =["manusia", "naga", "iblis", "setan", "binatang", "malaikat", "demigod", "elf", "half elf", "kamu buaya, cih dasar penggoda wanita", "zombie", "slime", "raksasa", "kurcaci", "golem", "duyung"];
    const randomRace = Math.floor(Math.random() * ras.length)
    const race = ras[randomRace];
    
    const khodam =["singa", "macan", "singa putih", "singa hitam", "monyet", "macan tutul", "macan putih", "macan hitam", "buaya", "naga", "ular", "gorila", "khodam tidak terdeteksi.\nCoba Lagi!!"]
    const randomKhodam = Math.floor(Math.random() * khodam.length)
    const Khod = khodam[randomKhodam]
    
const LuxionButton = (args[0])
    switch (LuxionButton) {
      case "kelamin": {
        message.reply(tipe);
        break;
      }
      case "kulit": {
        message.reply(warna);
        break;
      }
      case "ras": {
        message.reply(race);
        break;
      }
      case "khodam": {
        message.reply(Khod);
        break;
      }
      default: {
        api.sendMessage("Perintah tidak valid.\nGunakan Tipe: Kulit, Kelamin, ras, atau khodam", event.threadID);
        break;
      }
    }
  },
};

module.exports = LuxionCMD