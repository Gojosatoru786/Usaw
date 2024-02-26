const fs = require('fs');

module.exports = {
  config: {
    name: "waifusellall",
    version: "1.2",
    author: "EDINST",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "Sell all waifus."
    },
    longDescription: {
      en: "Sell all of your waifus to earn money."
    },
    category: "games",
  },
  langs: {
    en: {
      sell_success: "You sold all waifus and earned %1💰. Your balance is now %2💰.",
      waifu_not_found: "Waifu not found in your collection.",
      invalid_syntax: "Invalid syntax. Usage: <.waifusellall>"
    }
  },
  onStart: async function ({ api, event, args, getLang, message, usersData }) {
    const { senderID } = event;

    // Initialize the user data
    let userData = await usersData.get(senderID);

    // Load the waifu data from waifu.json
    let waifuData;
    try {
      waifuData = JSON.parse(fs.readFileSync('waifu.json', 'utf8'));
    } catch (error) {
      console.error(error);
      return message.reply('Failed to load waifu data. Please try again later.');
    }

    // Check if the user has any waifus in the collection
    const userWaifus = waifuData.filter(waifu => waifu.uid === senderID);
    if (userWaifus.length === 0) {
      return message.reply(getLang("waifu_not_found"));
    }

    // Load the waifu image data from waifuimg.json
    let waifuImageData;
    try {
      waifuImageData = JSON.parse(fs.readFileSync('waifuimg.json', 'utf8'));
    } catch (error) {
      console.error(error);
      return message.reply('Failed to load waifu image data. Please try again later.');
    }

    // Calculate total earnings from selling all waifus
    let totalEarnings = 0;

    // Iterate through each waifu in the collection
    for (let i = waifuData.length - 1; i >= 0; i--) {
      const waifu = waifuData[i];

      // Ignore waifus not owned by the user
      if (waifu.uid !== senderID) {
        continue;
      }

      // Find the waifu image with the given name
      const waifuImage = waifuImageData.find(image => image.waifuname.toLowerCase() === waifu.waifuName.toLowerCase());

      // Add the selling price to the total earnings
      totalEarnings += Number(waifuImage.price);
      // Remove the waifu from the collection
      waifuData.splice(i, 1);
    }

    // Update the user's balance
    userData.money += totalEarnings;

    // Save the updated user data
    await usersData.set(senderID, userData);

    // Save the updated waifu data to waifu.json
    try {
      fs.writeFileSync('waifu.json', JSON.stringify(waifuData, null, 2));
    } catch (error) {
      console.error(error);
      return message.reply('Failed to update waifu data. Please try again later.');
    }

    return message.reply(getLang("sell_success", totalEarnings, userData.money));
  }
};