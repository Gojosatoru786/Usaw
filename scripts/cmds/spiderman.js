const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs")


module.exports = {
    config: {
        name: "spiderman",
        aliases: ["spiderman"],
        version: "1.0",
        author: "zach",
        countDown: 5,
        role: 0,
        shortDescription: "memes",
        longDescription: "",
        category: "photo",
        guide: ""
    },



    onStart: async function ({ message, event, args }) {
        const mention = Object.keys(event.mentions);
        if (mention.length == 0) return message.reply("mention");
        else if (mention.length == 1) {
            const one = event.senderID, two = mention[0];
            bal(one, two).then(ptth => { message.reply({ body: "it's him🕸️", attachment: fs.createReadStream(ptth) }) })
        } else {
            const one = mention[1], two = mention[0];
            bal(one, two).then(ptth => { message.reply({ body: "he is not me🕸️", attachment: fs.createReadStream(ptth) }) })
        }
    }


};

async function bal(one, two) {

   let avone = await jimp.read(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=66262`)
    avone.circle()
    let avtwo = await jimp.read(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=66262`)
    avtwo.circle()
    let pth = "spiderman.png"
    let img = await jimp.read("https://i.imgur.com/AIizK0f.jpeg")
    img.resize(1440, 1080).composite(avone.resize(170, 170), 325, 110).composite(avtwo.resize(170, 170), 1000, 95);

    await img.writeAsync(pth)
    return pth
}