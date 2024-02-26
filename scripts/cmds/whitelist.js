const { config } = global.GoatBot;
const { client } = global;
const fs = require('fs');

module.exports = {
  config: {
    name: "whitelist",
    version: "1.0",
    author: "tanvir",
    role: 2,
    shortDescription: {
      en: "Add, delete, or list thread IDs from WhiteList"
    },
    longDescription: {
      en: "Add, delete, or list thread IDs from WhiteList. Usage: /whitelist [add/del/list/enable/disable] [thread ID]"
    },
    category: "𝗗𝗘𝗩𝗘𝗟𝗢𝗣𝗘𝗥",
    guide: {
      en: "{pn} [add | del | list | enable | disable]",
    }
  },
  onStart: async function ({ message, args, threadsData }) {
    let config = {};
    try {
      config = JSON.parse(fs.readFileSync(client.dirConfig));
    } catch (err) {
      console.error('', err);
    }

    const whiteListMode = config.whiteListMode;
    const whiteListIds = whiteListMode.whiteListIds || [];
    const action = args[0];
    const threadId = args[1];

    if (action === "add") {
      if (!whiteListIds.includes(threadId)) {
        const threadData = await threadsData.get(threadId);
        const threadName = threadData.threadName;
        whiteListIds.push(threadId);
        whiteListMode.whiteListIds = whiteListIds;
        fs.writeFileSync(client.dirConfig, JSON.stringify(config, null, 2));
        message.reply(`• ${threadName} (${threadId}) has been added to WhiteListIds ✅`);
      } else {
        const threadData = await threadsData.get(threadId);
        const threadName = threadData.threadName;
        message.reply(`• ${threadName} (${threadId}) is already in the WhiteListIds ✅`);
      }
    } else if (action === "del") {
      const index = whiteListIds.indexOf(threadId);
      if (index >= 0) {
        const threadData = await threadsData.get(threadId);
        const threadName = threadData.threadName;
        whiteListIds.splice(index, 1);
        whiteListMode.whiteListIds = whiteListIds;
        fs.writeFileSync(client.dirConfig, JSON.stringify(config, null, 2));
        message.reply(`• ${threadName} (${threadId}) has been removed from WhiteListIds ✅`);
      } else {
        const threadData = await threadsData.get(threadId);
        const threadName = threadData.threadName;
        message.reply(`• ${threadName} (${threadId}) is not in the WhiteListIds ❌`);
      }
    } else if (action === "list") {
      if (whiteListIds.length === 0) {
        message.reply("No thread IDs in WhiteListIds ❌");
      } else {
        const threadNames = await Promise.all(
          whiteListIds.map(threadId => threadsData.get(threadId).then(data => data.threadName))
        );
        const threadList = whiteListIds.map((id, index) => `${index+1}. ${threadNames[index]} (${id})`).join('\n');
        message.reply(`Thread IDs in WhiteListIds:\n${threadList}`);
      }
    } else if (action === "enable") {
      config.whiteListMode.enable = true;
      fs.writeFileSync(client.dirConfig, JSON.stringify(config, null, 2));
      message.reply(`WhiteListMode has been Enabled ✅`);
    } else if (action === "disable") {
        config.whiteListMode.enable = false;
        fs.writeFileSync(client.dirConfig, JSON.stringify(config, null, 2));
        message.reply(`WhiteListMode has been Disabled ✅`);
      } else {
        message.reply("Invalid action. Usage: /whitelist [add/del/list/enable/disable] [thread ID]");
      }
      }
      };