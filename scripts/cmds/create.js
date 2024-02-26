const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "GoatBotCommandCreate",
    aliases: ["create"],
    version: "1.0",
    author: "NARA iT",
    shortDescription: "Create a new GoatBot command",
    longDescription: "Create a new GoatBot command",
    category: "commands",
    guide: { en: "" },
  },
  onStart: async function ({ message, args, event, usersData, api }) {
    try {
      const commandName = args[0];
      const commandContent = args.slice(1).join(" ");
      const commandTemplate = `
      module.exports = {
        config: {
          name: "${commandName}",
          aliases: [],
          version: "1.0",
          author: "YourName",
          shortDescription: "Short description for ${commandName}",
          longDescription: "Long description for ${commandName}",
          category: "commands",
          guide: { en: "" }
        },
        onStart: function ({ message, args, event, api, globalGoatBot }) {
          // Your code goes here
          message.reply("Hello from ${commandName} command!");
        }
      };
      `;
      const commandFilePath = `scripts/cmds/${commandName}.js`;

      fs.writeFileSync(commandFilePath, commandTemplate);

      message.reply(`Command ${commandName} created successfully!`);

    } catch (error) {
      console.error(error);
      message.reply("An error occurred while creating the command.");
    }
  }
};