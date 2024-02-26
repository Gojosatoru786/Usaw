module.exports = {
  config: {
    name: "waifuinfo",
    aliases: ["ilst"],
    version: "1.0",
    author: "EDINST",
    countDown: 0,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: ""
    },
    category: "fun",
    guide: {
      en: "{pn}"
    }
  },
  langs: {
    en: {
      gg: ""
    }
  },
  onStart: async function({ api, event, args, message }) {
    try {
      message.reply(`╔════ஜ۩۞۩ஜ═══╗
  
• 𝗗𝗿𝗼𝗽 𝗥𝗮𝘁𝗲

B1: 80%
B2: 50%
B3: 30%
B4: 20%
B5: 10%
B6: 5%

• 𝗠𝗮𝗿𝗸𝗲𝘁 𝗣𝗿𝗶𝗰𝗲

B1: 98
B2: 130
B3: 260
B4: 310
B5: 390
B6: 500
  
╚════ஜ۩۞۩ஜ═══╝`);
    } catch (error) {
      console.error("Error bro: " + error);
    }
  }
};