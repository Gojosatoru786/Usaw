module.exports = {
  config: {
    name: "waifulist",
    aliases: ["lst"],
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
    category: "waifu",
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
  
                Games
  
1. Waifupull
2. Waifusell
3. Waifuinv
4. Waifusellall
5. Waifuinfo
  
                Coming
3. Waifutrade
  
╚════ஜ۩۞۩ஜ═══╝`);
    } catch (error) {
      console.error("Error bro: " + error);
    }
  }
};