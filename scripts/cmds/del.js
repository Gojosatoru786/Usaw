const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "delete cmd",
    aliases:["del"], 
    author: "NARA iT",
    version: "1.0",
    role: 2,
    description: "",
    usage: "",
    category: "owner"
  },

  onStart: async function ({ args, message, event}) {
   
    const permission = 
      ["100062859976905", "61550900587846", "100089504037594"];
    if 
  (!permission.includes(event.senderID)) {

    return message.reply("kamu tidak diizinkan menggunakan perintah ini",                       event.threadID, event.messageID);
    
  }


    
    const commandName = args[0];

    if (!commandName) {
      return message.reply("masukan nama cmd.");
    }

    const filePath = path.join(__dirname, '..', 'cmds', `${commandName}`);

    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        message.reply(`system nara telah menghapus: ${commandName} .`);
      } else {
        message.reply(`perintah ${commandName} tidak ditemukan.`);
      }
    } catch (err) {
      console.error(err);
      message.reply(`Tidak bisa menghapus cmd:\${commandName}: ${err.message}`);
    }
  }
};