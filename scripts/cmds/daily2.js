const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "daily",
    version: "1.1",
    author: "NTKhang",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "game",
    guide: {
      en: "   {pn}"
        + "\n   {pn} info: View daily gift information"
    },
    envConfig: {
      rewardFirstDay: {
        coin: 2,
        exp: 1000
      }
    }
  },

  langs: {
    en: {
      alreadyReceived: "You have already received the gift",
      received: "You have received %1 coins and %2 exp",
      info: "Here is the daily gift information:"
    }
  },

  onStart: async function ({ args, message, event, envCommands, usersData, commandName, getLang }) {
    const reward = envCommands[commandName].rewardFirstDay;
    if (args[0] == "info") {
      let msg = getLang("info") + "\n";
      for (let i = 1; i < 8; i++) {
        const getCoin = Math.floor(reward.coin * (1 + 20 / 100) ** ((i == 0 ? 7 : i) - 1));
        const getExp = Math.floor(reward.exp * (1 + 20 / 100) ** ((i == 0 ? 7 : i) - 1));
        msg += `Day ${i}: ${getCoin} coins, ${getExp} exp\n`;
      }
      return message.reply(msg);
    }

    const dateTime = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY");
    const date = new Date();
    const currentDay = date.getDay(); // 0: sunday, 1: monday, 2: tuesday, 3: wednesday, 4: thursday, 5: friday, 6: saturday
    const { senderID } = event;

    const userData = await usersData.get(senderID);
    if (userData.data.lastTimeGetReward === dateTime)
      return message.reply(getLang("alreadyReceived"));

    const getCoin = Math.floor(reward.coin * (1 + 20 / 100) ** ((currentDay == 0 ? 7 : currentDay) - 1));
    const getExp = Math.floor(reward.exp * (1 + 20 / 100) ** ((currentDay == 0 ? 7 : currentDay) - 1));
    userData.data.lastTimeGetReward = dateTime;
    await usersData.set(senderID, {
      money: userData.money + getCoin,
      exp: userData.exp + getExp,
      data: userData.data
    });
    message.reply(getLang("received", getCoin, getExp));
  }
};