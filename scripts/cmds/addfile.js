const fs = require('fs');

module.exports = {
  config: {
    name: "addfile",
    aliases: [],
    version: "1.0",
    author: "EDINST",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "Add a file."
    },
    longDescription: {
      en: "This command allows you to add a file with a given name and content."
    },
    category: "ai chat",
    guide: {
      en: "Usage: .addfile (name) (content) - Example: .addfile cmd.js hi all"
    }
  },
  langs: {
    en: {
      gg: ""
    }
  },

  onStart: async function({ api, event, args, message }) {
    try {
      // Check if the command was used correctly
      if (args.length < 2) {
        api.sendMessage("Usage: .addfile (name) (content)", event.threadID);
        return;
      }

      const fileName = args[0];
      const fileContent = args.slice(1).join(' ');

      // Create the file with the specified content
      fs.writeFileSync(fileName, fileContent);

      api.sendMessage(`File '${fileName}' has been added successfully.`, event.threadID);
    } catch (error) {
      api.sendMessage("An error occurred while adding the file.", event.threadID);
      console.error(error);
    }
  }
};