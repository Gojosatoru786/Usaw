const axios = require('axios');


module.exports = {
 config: {
 name: "Imaginev6",
 version: "1.1",
 author: "OtinXSandip",
 countDown: 10,
 role: 0,
 shortDescription: {
 en: 'Text to Image'
 },
 longDescription: {
 en: "Text to image"
 },
 category: "image",
 guide: {
 en: '{pn} your prompt | Type' +
 ' here are supported models:'
 }
 },

 onStart: async function ({ api, event, args, message, usersData }) {
 const text = args.join(" ");
 if (!text) {
 return message.reply("Please provide a prompt.");
 }


 let prompt, model;
 if (text.includes("|")) {
 const [promptText, modelText] = text.split("|").map((str) => str.trim());
 prompt = promptText;
 model = modelText;
 } else {
 prompt = text;
 model = 2;
 }
 message.reply("✅| Creating your Imagination...", async (err, info) => {
 let ui = info.messageID;
api.setMessageReaction("⏳", event.messageID, () => {}, true);
 try {
 const response = await axios.get(`https://shivadon.onrender.com/sdxl?prompt=${encodeURIComponent(prompt)}&model=${model}`);
api.setMessageReaction("✅", event.messageID, () => {}, true);
 const img = response.data.combinedImageUrl;
 message.unsend(ui);
 message.reply({
 body: `𝗛𝗜𝗡𝗔 | 𝗜𝗠𝗔𝗚𝗜𝗡𝗘 🌸
━━━━━━━━━━━━━━━
Here's your imagination 🖼.`,
 attachment: await global.utils.getStreamFromURL(img)
 }, async (err, info) => {
 let id = info.messageID;
 global.GoatBot.onReply.set(info.messageID, {
 commandName: this.config.name,
 messageID: info.messageID,
 author: event.senderID,
 imageUrls: response.data.imageUrls 
 });
 });
 } catch (error) {
 console.error(error);
 api.sendMessage(`Error: ${error}`, event.threadID);
 }
 });
 },


 onReply: async function ({ api, event, Reply, usersData, args, message }) {
 const { author, messageID, imageUrls } = Reply;
 if (event.senderID !== author) return;
 try {
 for (let i = 1; i <= 4; i++) {
 const img = imageUrls[`image${i}`];
 message.reply({ attachment: await global.utils.getStreamFromURL(img) });
 }
 } catch (error) {
 console.error(error);
 api.sendMessage(`Error: ${error}`, event.threadID);
 }
 message.unsend(Reply.messageID); 
 },
};