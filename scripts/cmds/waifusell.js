const fs = require('fs');

module.exports = {
  config: {
    name: "waifusell",
    version: "1.2",
    author: "EDINST",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "Sell a waifu."
    },
    longDescription: {
      en: "Sell your waifu to earn money."
    },
    category: "games",
  },
  langs: {
    en: {
      sell_success: "You sold %1 for %2💰. Your balance is now %3💰.",
      waifu_not_found: "Waifu not found in your collection.",
      invalid_syntax: "Invalid syntax. Usage: <.waifusell waifuname>"
    }
  },
  onStart: async function ({ api, event, args, getLang, message, usersData }) {
    const { senderID } = event;
    const waifuName = args.join(" ");

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

    // Load the waifu image data from waifuimg.json
    let waifuImageData;
    try {
      waifuImageData = JSON.parse(fs.readFileSync('waifuimg.json', 'utf8'));
    } catch (error) {
      console.error(error);
      return message.reply('Failed to load waifu image data. Please try again later.');
    }
    
    // Find the waifu image with the given name
    const waifuImage = waifuImageData.find(image => image.waifuname.toLowerCase() === waifuName.toLowerCase());

    if (!waifuImage) {
      return message.reply(getLang("waifu_not_found"));
    }

    // Set the selling price from the waifu image data
    const sellingPrice = waifuImage.price;

    // Check if the user has the waifu in their collection
    const userHasWaifu = waifuData.some(waifu => waifu.uid === senderID && waifu.waifuName === waifuName);

    if (!userHasWaifu) {
      return message.reply(getLang("waifu_not_found"));
    }

    // Update the user's balance
    userData.money += Number(sellingPrice);

    // Save the updated user data
    await usersData.set(senderID, userData);

    // Remove the waifu from the collection
    waifuData = waifuData.filter(waifu => !(waifu.uid === senderID && waifu.waifuName === waifuName));

    // Save the updated waifu data to waifu.json
    try {
      fs.writeFileSync('waifu.json', JSON.stringify(waifuData, null, 2));
    } catch (error) {
      console.error(error);
      return message.reply('Failed to update waifu data. Please try again later.');
    }

    return message.reply(getLang("sell_success", waifuName, sellingPrice, userData.money));
  }
};