const fs = require('fs');

const help = `
# Gacha
   Genshin Cards

- pull
Pull new card. (12¥)

- info
Gacha information`;

const info = `
# Gacha Information
Genshin Cards

• Drop Rate
2★: 80.2%
3★: 28.8%
4★: 8.2%
5★: 1.2%
6★: 0.01%

• Market Price
2★: 11.3¥
3★: 13.8¥
4★: 20.5¥
5★: 29.8¥
6★: 73.5¥`;

const genshinDataArray = JSON.parse(fs.readFileSync('genshin.json', 'utf8')) || [];

module.exports = {
  config: {
    name: 'genshin',
    aliases: ['gens'],
    version: '1.0',
    role: 0,
    countDown: 5,
    author: 'Bernando Gaming',
    shortDescription: '',
    longDescription: '',
    category: 'GACHA',
    guide: { en: '' },
  },
  langs: {
    en: {
      sell_success: "You sold %1 for %2💰. Your balance is now %3💰.",
      genshin_not_found: "Genshin not found in your collection.",
      invalid_syntax: "Invalid syntax. Usage: <${p}gens sell (genshin name)>"
    }
  },
  onStart: async function ({ api, event, args, getLang, message, usersData }) {
    if (event.body && event.body.includes('help')) {
      api.sendMessage(help, event.threadID);
    } else if (event.body && event.body.includes('info')) {
      api.sendMessage(info, event.threadID);
    } else if (event.body && event.body.includes('pull')) {
      const uid = event.senderID;
      let userName;

      try {
        const profileInfo = await api.getUserInfo(uid);
        const userData = profileInfo[uid];
        userName = userData.name;
      } catch (error) {
        console.error('Error fetching profile info:', error);
        userName = 'Unknown User';
      }

      const genshinJson = fs.readFileSync('genshinimg.json', 'utf8');
      const genshinArray = JSON.parse(genshinJson);

      let totalPossibility = 0;
      for (const genshinData of genshinArray) {
        totalPossibility += parseFloat(genshinData.possibility);
      }

      const randomNumber = Math.random() * totalPossibility;

      let selectedGenshin;

      for (const genshinData of genshinArray) {
        totalPossibility -= parseFloat(genshinData.possibility);
        if (randomNumber >= totalPossibility) {
          selectedGenshin = genshinData;
          break;
        }
      }

      if (!selectedGenshin) {
        selectedGenshin = genshinArray[Math.floor(Math.random() * genshinArray.length)];
      }

      const genshinName = selectedGenshin.genshinname;
      const img = selectedGenshin.link;
      const stars = selectedGenshin.stars;
      const price = selectedGenshin.price;
      const id = selectedGenshin.id;

      genshinDataArray.push({
        uid: uid,
        name: userName,
        gachaName: genshinName,
        stars: stars,
        id: id,
        link: img,
        price: price,
      });
      fs.writeFileSync('genshin.json', JSON.stringify(genshinDataArray), 'utf8');
      const senderID = event.senderID;
      const userData = await usersData.get(senderID);
      if (userData.money >= 12) {
        usersData.set(senderID, {
          money: userData.money - 12,
          data: userData.data,
        });

        message.reply({
          body: ``,
          attachment: await global.utils.getStreamFromURL(img),
        }, event.threadID);
      } else {
        api.sendMessage("You need 12$ to pull a new card.", event.threadID);
      }
    } else if (event.body && event.body.includes('sell')) {
      const { senderID } = event;
      const genshinId = args.join(" ");
      let userData = await usersData.get(senderID);
      let genshinData;
      try {
        genshinData = JSON.parse(fs.readFileSync('genshin.json', 'utf8'));
      } catch (error) {
        console.error(error);
        return message.reply('Failed to load genshin data. Please try again later.');
      }

      let genshinImageData;
      try {
        genshinImageData = JSON.parse(fs.readFileSync('genshinimg.json', 'utf8'));
      } catch (error) {
        console.error(error);
        return message.reply('Failed to load waifu image data. Please try again later.');
      }

      const genshinImage = genshinImageData.find(image => image.genshinid.toLowerCase() === genshinId.toLowerCase());

      if (!genshinImage) {
        return message.reply(getLang("genshin_not_found"));
      }

      const sellingPrice = genshinImage.price;

      const userHasGenshin = genshinData.some(genshin => genshin.uid === senderID && genshin.genshinId === genshinId);

      if (!userHasGenshin) {
        return message.reply(getLang("genshin_not_found"));
      }

      userData.money += Number(sellingPrice);

      await usersData.set(senderID, userData);

      genshinData = genshinData.filter(genshin => !(genshin.uid === senderID && genshin.genshinId === genshinId));

      try {
        fs.writeFileSync('genshin.json', JSON.stringify(genshinData, null, 2));
      } catch (error) {
        console.error(error);
        return message.reply('Failed to update genshin data. Please try again later.');
      }

      return message.reply(getLang("sell_success", genshinId, sellingPrice, userData.money));
    }
  },
};
