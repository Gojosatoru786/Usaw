const fs = require('fs');

module.exports = {
  config: {
    name: "deldatabase",
    aliases: ["deletedb"],
    version: "1.0",
    author: "EDINST",
    countDown: 10,
    role: 2,
    shortDescription: {
      en: "Deletes a database file."
    },
    longDescription: {
      en: "This command allows you to delete a database file named data.SQLite in the database/data/ folder."
    },
    category: "tools",
    guide: {
      en: ""
    }
  },
  langs: {
    en: {
      gg: ""
    }
  },

  onStart: async function({ api, event, args, message }) {
    try {
      const path = "./database/data/data.sqlite";
      
      // Check if the database file exists
      if(fs.existsSync(path)) {
        fs.unlinkSync(path);
        api.sendMessage("Database file successfully deleted.", event.threadID);
      } else {
        api.sendMessage("Database file doesn't exist.", event.threadID);
      }
    } catch(error) {
      console.log(error);
      api.sendMessage("An error occurred while deleting the database file.", event.threadID);
    }
  }
};