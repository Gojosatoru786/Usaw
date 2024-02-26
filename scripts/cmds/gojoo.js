module.exports = {
 config: {
 name: "gojoo",
 version: "1.0",
 author: "Jaychris Garcia",
 countDown: 5,
 role: 0,
 shortDescription: "no prefix",
 longDescription: "no prefix",
 category: "no prefix",
 }, 
 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "gojo") {
 return message.reply({
 body: "hello, i'm nishimiya. follow my master GojoxRimon.🛸 Your box chat prefix:/",
 attachment: await global.utils.getStreamFromURL("https://i.imgur.com/0S0qlmK.jpeg")
 });
 }
 }
}