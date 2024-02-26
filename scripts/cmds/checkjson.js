const fs = require('fs');

module.exports = {
    config: {
        name: "chekjson",
        aliases: ["checkjson"],
        version: "1.0",
        author: "EDINST",
        countDown: 10,
        role: 0,
        shortDescription: {
            en: "Check the contents of a JSON file."
        },
        longDescription: {
            en: "This command allows you to view the contents of a JSON file."
        },
        category: "ai chat",
        guide: {
            en: "Usage: .chekjson <filename>"
        }
    },

    langs: {
        en: {
            gg: "File content:"
        }
    },

    onStart: async function({ api, event, args, message }) {
        try {
            if (args.length !== 1) {
                api.sendMessage("Usage: .chekjson <filename>", event.threadID);
                return;
            }

            const filename = args[0];

            // Coba baca isi file JSON
            const data = fs.readFileSync(filename, 'utf8');
            const jsonData = JSON.parse(data);

            api.sendMessage(`${this.langs.en.gg}\n${JSON.stringify(jsonData, null, 2)}`, event.threadID);
        } catch (error) {
            api.sendMessage("Error: " + error.message, event.threadID);
        }
    }
};