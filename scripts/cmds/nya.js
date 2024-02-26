module.exports = {
 config: {
   name: "nara",
   aliases: ["nya"],
   version: "1.0",
   author: "EDINST",
   countDown: 0,
   role: 0,
   shortDescription: {
     en: "{pn} | {pn} -dm"
   },
   longDescription: {
     en: ""
   },
   category: "fun",
   guide: {
     en: "{pn} | {pn} -dm"
   }
 },
 langs: {
   en: {
     gg: ""
   }
 },
 onStart: async function({ api, event, args, message }) {
   try {
     const query = encodeURIComponent(args.join(' '));
     const isDM = event.isGroup ? args.includes('-dm') : false;

     if (isDM) {
       api.sendMessage("meow.", event.senderID);
     } else {
       message.reply("iya?", event.threadID);
     }
   } catch (error) {
     console.error("Error bro: " + error);
   }
 }
};