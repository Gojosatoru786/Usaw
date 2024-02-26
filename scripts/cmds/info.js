const fs = require('fs');
const moment = require('moment-timezone');

module.exports = {
  config: {
    name: "info",
    version: "1.0",
    author: "Mesbah Bb'e",
    category: "𝗜𝗡𝗙𝗢",
  },

  onStart: async function ({ message }) {
    const botName = global.GoatBot.config.nickNameBot;//your bot name
    const botPrefix = global.GoatBot.config.prefix;//your bot prefix 
    const status = "/";//set bot status
    const authorName = "GOJO x Rimon";//set your name
    const ownerAge = "null";//set your age
    const authorFB = "https://www.facebook.com/profile.php?id=100090659982866&mibextid=9R9pXO";//set your Facebook link


    const puk = JSON.parse(fs.readFileSync('Mesbah.json'));//Mesbah.json just change to your file name
    const link = puk[Math.floor(Math.random() * puk.length)];

    // Get current date and time in Asia/Kathmandu timezone
    const now = moment().tz('Asia/Dhaka');
    const date = now.format('MMMM Do YYYY');
    const time = now.format('h:mm:ss A');
    // Calculate bot uptime
    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const days = Math.floor(uptime / (60 * 60 * 24));
    const uptimeString = `${hours}hrs: ${minutes}min: ${seconds}sec`;

    message.reply({
      body: `===「 Bot & owner Info 」===\n❏Bot Name: ${botName}\n❏Bot Prefix: ${botPrefix}\n❏Status: ${status}\n❏Author Name: ${authorName}\n❏Author Facebook: ${authorFB}\n❏Date: ${date}\n❏Time: ${time}\n❏Bot Running: ${uptimeString}\n=====================`,
      attachment: await global.utils.getStreamFromURL(link)
    });
  },

  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "info") {
      this.onStart({ message });
    }
  }
}