const fishList = {
  "tuna": 20,
  "buntal": 50,
  "cumi cumi": 100,
  "salmon": 40,
  "Gurame": 70,
  "Mas": 100,
  "Lele": 90,
  "Bandeng": 60
};

module.exports = {
  config: {
    name: "fish",
    aliases: ["fishing"],
    version: "1.0",
    author: "riley noson",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "Send a random fish and earn money"
    },
    longDescription: {
      en: "Send a random fish and earn money"
    },
    category: "games",
    guide: {
      en: "Use the fish command to send a random fish and earn money."
    }
  },
  langs: {
    en: {
      gg: "╭──⭓Kolam NARA\n├⟩ KAMU DAPET IKAN ⟩» [ %fishes% ] \n├⟩mendapatkan hasil penjualan  [ %fishPrice% ]\n╰─⭓"
    }
  },

  onStart: async function ({ api, event, args, message, usersData }) {
    const fishNames = Object.keys(fishList);
    const randomFishCount = Math.floor(Math.random() * 3) + 1; 
    let totalMoneyEarned = 0;
    let fishes = [];

    for (let i = 0; i < randomFishCount; i++) {
      const randomFishIndex = Math.floor(Math.random() * fishNames.length);
      const randomFishName = fishNames[randomFishIndex];
      const randomFishPrice = fishList[randomFishName];
      totalMoneyEarned += randomFishPrice;
      fishes.push(randomFishName);
    }

    const randomFishPrice = fishes.map(fish => fishList[fish]);

    api.sendMessage(
      module.exports.langs.en.gg
        .replace("%fishes%", fishes.join(" | "))
        .replace("%fishPrice%", randomFishPrice.join(" | ")),
      event.threadID
    );

    const { senderID } = event;
    let userData = await usersData.get(senderID);
    if (!userData) {
      userData = { money: 0 };
    }

    userData.money += totalMoneyEarned;
    await usersData.set(senderID, userData);
  }
};