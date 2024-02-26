const axios = require("axios");

module.exports = {
  config: {
    name: 'hinu',
    aliases: ["sim"],
    version: '1.2',
    author: 'Samir Œ',
    countDown: 0,
    role: 0,
    shortDescription: 'AI CHAT',
    longDescription: {
      vi: 'Chat với simsimi',
      en: 'Chat with sam'
    },
    category: 'Ai chat',
    guide: {
      vi: '   {pn} [on | off]: bật/tắt simsimi'
        + '\   {pn} <word>: chat nhanh với simsimi'
        + '\   Ví dụ:\    {pn} hi',
      en: '   {pn} <word>: chat with sam'
        + '\   Example:{pn} hi'
    }
  },

  langs: {
    vi: {
      turnedOn: 'Bật simsimi thành công!',
      turnedOff: 'Tắt simsimi thành công!',
      chatting: 'Đang chat với simsimi...',
      error: 'Simsimi đang bận, bạn hãy thử lại sau'
    },
    en: {
      turnedOn: 'Turned on sam successfully!',
      turnedOff: 'Turned off sam successfully!',
      chatting: 'Already Chatting with sam...',
      error: 'What?🙂'
    }
  },

  onStart: async function ({ api, args, message, event, threadsData, usersData, dashBoardData, globalData, threadModel, userModel, dashBoardModel, globalModel, role, commandName, getLang }) {
    if (args[0] == 'on' || args[0] == 'off') {
      await threadsData.set(event.threadID, args[0] == "on", "settings.simsimi");
      return message.reply(args[0] == "on" ? getLang("turnedOn") : getLang("turnedOff"));
    } else if (args[0]) {
      const yourMessage = args.join(" ");
      try {
        const responseMessage = await getMessage(yourMessage);
        return message.reply(`${responseMessage}`);
      } catch (err) {
        console.log(err);
        return message.reply(getLang("error"));
      }
    }
  },

  onReply: async function ({ message, event, Reply, args, usersData, api }) {
    let { author, commandName, messageID } = Reply;
    if (event.senderID != author) return;

    const yourMessage = args.join(" ");
    try {
      const responseMessage = await getMessage(yourMessage);
      return message.reply(`${responseMessage}`);
    } catch (err) {
      console.log(err);
      return message.reply(getLang("error"));
    }
  },

  onChat: async ({ args, message, threadsData, event, isUserCallCommand, getLang }) => {
    if (args.length > 1 && !isUserCallCommand && (await threadsData.get(event.threadID, "settings.simsimi"))) {
      try {
        const langCode = (await threadsData.get(event.threadID, "settings.lang")) || global.GoatBot.config.language;
        const responseMessage = await getMessage(args.join(" "), langCode);
        return message.reply(`${responseMessage}`);
      } catch (err) {
        return message.reply(getLang("error"));
      }
    }
  },
};

async function getMessage(yourMessage, langCode) {
  const res = await axios.post(
    'https://api.simsimi.vn/v1/simtalk',
    new URLSearchParams({
      'text': yourMessage,
      'lc': 'en'
    })
  );

  if (res.status > 200) throw new Error(res.data.success);

  return res.data.message;
}