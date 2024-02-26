const axios = require('axios');

module.exports = {
  config: {
    name: "card",
    version: "1.0",
    author: "Rishad",
    countDown: 20,
    role: 0,
    shortDescription: {
      en: "💳 Credit card generator with expiration"
    },
    longDescription: {
      en: "💳 Credit card generator with expiration"
    },
    category: "tool",
    guide: {
      en: "{pn} type\n types: \n1 = Visa\n2 = MasterCard \n3 = American Express\n4 = Discover+Card"
    }
  },

  onStart: async function ({ api, event, args }) {

    try {
      const type = args.join(' ');
      const apiUrl = `https://for-devs.onrender.com/api/creditcard?type=${type}&apikey=fuck`;
      const response = await axios.get(apiUrl);

      if (response.data && response.data.length > 0) {
        const cardInfo = response.data[0];
        const messageBody = `👤 Issuer: ${cardInfo.issuer}\n🔗 Card Number: ${cardInfo.cardNumber}\n🗓 Expiration: ${cardInfo.exp}\nℹ CVV: ${cardInfo.cvv}\n📛 Name: ${cardInfo.name}\n📧 Address: ${cardInfo.address}\n📍 Country: ${cardInfo.country}\n🧑‍💻 Zipcode: ${cardInfo.zipcode}\n\n🎉 Enjoy your new credit card! 🌟`;
        return api.sendMessage({ body: `✅ Credit card generated\n\n${messageBody}` }, event.threadID, event.messageID);
      } else {
        return api.sendMessage('Hehhheee error......', event.threadID, event.messageID);
      }
    } catch (error) {
      console.log(error);
      return api.sendMessage('Hehhheee error......', event.threadID, event.messageID);
    }
  }
};