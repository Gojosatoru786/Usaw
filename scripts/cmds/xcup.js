
const valid = ["1", "2", "3"];

module.exports = {
  config: {
    name: "xcup",
    version: "1.0",
    role: 0,
    countDown: 10,
    author: "GojoXrimon",
    longDescription: { en: "3 Cup festive game" },
    category: "game",
    guide: { en: "{pn} [Wager (optional)] The bot will prompt you with 3 boxes, You will have to guess which box holds the ball" },
  },
  onStart: async function ({ event, args, usersData, message }) {
    const userData = await usersData.get(event.senderID);
    if (userData.money <= 0) return message.reply("You're currently in Debt");
    let mon;
    const wage = args[0];
    if (!wage) {
      mon = 10;
    } else if (isNaN(wage) || wage > 50 || wage < 5) {
      return message.reply("Your Wager Must Be Over 5 Credits and below 50 credits");
    } else {
      mon = wage;
    }
    if (mon > userData.money) return message.reply("You don't have enough Capital")
    const BOTChoice = valid[Math.floor(Math.random() * valid.length)];
    message.reply(`🎁 🎁 🎁`, (err, info) => {
      global.GoatBot.onReply.set(info.messageID, {
        commandName: this.config.name,
        messageID: info.messageID,
        author: event.senderID,
        choice: BOTChoice,
        wage: mon
      });
    });
  },
  onReply: async function ({ args, event, usersData, message, Reply, api }) {
    const { messageID, author, choice, wage } = Reply;
    if (author != event.senderID) return;
    if (!valid.includes(args[0]?.toUpperCase())) return message.reply("Invalid Reply");

    const userData = await usersData.get(event.senderID);
    let money = parseInt(wage);
    const correctEmoji = "🥎";
    const wrongEmoji = "💥";

    let replyEmojis = [wrongEmoji, wrongEmoji, wrongEmoji];
    replyEmojis[choice - 1] = correctEmoji;

    if (choice == args[0]) {
      await usersData.set(event.senderID, {
        money: userData.money += money,
        exp: userData.exp += money,
        data: userData.data,
      });
    } else {
      await usersData.set(event.senderID, {
        money: userData.money - money,
        exp: userData.exp - money,
        data: userData.data,
      });
    }

    // Fix the error by properly using the `api` object
    global.GoatBot.onReply.delete(messageID);
    await api.setMessageReaction(replyEmojis.join(" "), messageID);

    if (choice === args[0]) {
      return message.reply(`You Won ${money}$`);
    } else {
      return message.reply(`You Lost ${money}$`);
    }
  },
};