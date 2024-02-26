
      module.exports = {
        config: {
          name: "undefined",
          aliases: [],
          version: "1.0",
          author: "YourName",
          shortDescription: "Short description for undefined",
          longDescription: "Long description for undefined",
          category: "commands",
          guide: { en: "" }
        },
        onStart: function ({ message, args, event, api, globalGoatBot }) {
          // Your code goes here
          message.reply("Hello from undefined command!");
        }
      };
      