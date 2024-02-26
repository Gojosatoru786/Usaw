const fs = require('fs');

const help = `
# Gacha
   Gacha Cards

- pull
Pull new card. (12¥)

- info
Gacha information`;

const info = `
# Gacha Information
Gacha Cards

• Drop Rate
1★: 80.8%
2★: 92.4%
3★: 28.8%
4★: 8.2%
5★: 1.2%
6★: 0.01%

• Market Price
1★: 8.1¥
2★: 11.3¥
3★: 13.8¥
4★: 20.5¥
5★: 29.8¥
6★: 73.5¥`;

const gachaDataArray = JSON.parse(fs.readFileSync('gacha.json', 'utf8')) || [];

module.exports = {
  config: {
    name: 'gacha',
    aliases: [],
    version: '1.0',
    role: 0,
    countDown: 5,
    author: 'YourName',
    shortDescription: 'ga ada',
    longDescription: 'ga ada .',
    category: 'command',
    guide: { en: '' },
  },
  onStart: async function ({ event, api, usersData, message }) {
    if (event.body.indexOf('help') !== -1) {
      api.sendMessage(help, event.threadID);
    } else if (event.body.indexOf('info') !== -1) {
      api.sendMessage(info, event.threadID);
    } else if (event.body.indexOf('pull') !== -1) {
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

      const gachaJson = fs.readFileSync('gachaimg.json', 'utf8');
      const gachaArray = JSON.parse(gachaJson);

      let totalPossibility = 0;
      for (const gachaData of gachaArray) {
        totalPossibility += parseFloat(gachaData.possibility);
      }

      const randomNumber = Math.random() * totalPossibility;

      let selectedGacha;

      for (const gachaData of gachaArray) {
        totalPossibility -= parseFloat(gachaData.possibility);
        if (randomNumber >= totalPossibility) {
          selectedGacha = gachaData;
          break;
        }
      }

      if (!selectedGacha) {
        selectedGacha = gachaArray[Math.floor(Math.random() * gachaArray.length)];
      }

      const gachaName = selectedGacha.gachaname;
      const img = selectedGacha.link;
      const stars = selectedGacha.stars;
      const price = selectedGacha.price;

      gachaDataArray.push({
        uid: uid,
        name: userName,
        gachaName: gachaName,
        stars: stars,
        link: img,
        price: price,
      });
      fs.writeFileSync('gacha.json', JSON.stringify(gachaDataArray), 'utf8');

      const senderID = event.senderID;
      const userData = {
        money: 12,
        data: [],
      };      

      if (userData.money >= 12) {
        usersData.set(senderID, {
          money: userData.money - 12,
          data: userData.data,
        });

        message.reply({
          body: `╔════ஜ۩۞۩ஜ═══╗
  
YOUR NAME: ${userName}
GACHA NAME: ${gachaName}
STARS: ${stars}
PRICE: ${price}💰
  
╚════ஜ۩۞۩ஜ═══╝`,
          attachment: await global.utils.getStreamFromURL(img),
        }, event.threadID);
      } else {
        api.sendMessage("You need 12$ to buy a new gacha.", event.threadID);
      }
    }
  },
};