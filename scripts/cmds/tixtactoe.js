module.exports = {
  config: {
    name: "tictactoe",
 aliases: ["ttt"],
    version: "1.1",
    author: "kshitiz",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "X-O game"
    },
    longDescription: {
      vi: "",
      en: "Play X-O with your friend"
    },
    category: "game",
    guide: {
      vi: "reply tin nhắn muốn gỡ của bot và gọi lệnh {pn}",
      en: "tag someone"
 }
  },

onStart: async function ({ event, message, api, usersData, args}) {
 const mention = Object.keys(event.mentions);

 if(args[0] == "ending") {
if(!global.game.hasOwnProperty(event.threadID) || global.game[event.threadID].on == false ){ message.reply("Currently there are no game in this group😐❤️")
 } else {
if(event.senderID == global.game[event.threadID].player1.id || event.senderID == global.game[event.threadID].player2.id ){
 if(event.senderID == global.game[event.threadID].player1.id){
 message.reply({body:`What a crying baby 😐. ${global.game[event.threadID].player1.name} escaped🌝.\nwon${global.game[event.threadID].player2.name}.`, mentions: [{
 tag: global.game[event.threadID].player1.name,
 id: global.game[event.threadID].player1.id,

 }, {
 tag: global.game[event.threadID].player2.name,
 id: global.game[event.threadID].player2.id,

 }]


 })
 } else {
 message.reply({body:`The loser escaped ${global.game[event.threadID].player2.name}\n if the winner is${global.game[event.threadID].player1.name}🌟`, mentions: [{
 tag: global.game[event.threadID].player1.name,
 id: global.game[event.threadID].player1.id,

 }, {
 tag: global.game[event.threadID].player2.name,
 id: global.game[event.threadID].player2.id,

 }]


 })
 }
 global.game[event.threadID].on = false
} else{
 message.reply("currently there is no game in this group😐❤️")
}




 }


 } else{


 if(mention.length == 0) return message.reply("To play X or O against someone, you need to tag them ♻️\nTo end the round, write end✅");
 if(!global.game.hasOwnProperty(event.threadID) || global.game[event.threadID].on == false ){
 global.game[event.threadID] = {
 on:true,
 board:"🔲🔲🔲\n🔲🔲🔲\n🔲🔲🔲", 
 bid:"",
 board2:"123456789",
 avcell: ["1", "2","3","4","5","6","7","8","9"],
 turn: mention[0],
 player1: {id:mention[0],name:await usersData.getName(mention[0])},
 player2: {id:event.senderID, name: await usersData.getName(event.senderID)},
 bidd:"❌",
 bid:"",
 ttrns: [],
 counting:0
 }
 message.send(global.game[event.threadID].board, (err, info) =>{global.game[event.threadID].bid = info.messageID;
 global.fff.push(info.messageID) })
 }else{message.reply("There is a game in the group right now 😐🪓")}

 }

},
 onChat: async function ({ event, message, api, args}){

if(event.type =="message" && event.body.includes("._.")){
 message.reply({body:"Let them focus 🌝 give birth to a fuck you 😠",attachment:await global.utils.getStreamFromURL("https://scontent.xx.fbcdn.net/v/t1.15752-9/316181740_667600474745895_5536856546858630902_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=ae9488&_nc_ohc=bR-GcvE6RHMAX_YE5bu&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdQk45VA6QO5_X5vTQJYdXF4nH45UeESYppxrFbZdRlJMw&oe=63A3009D")})
}



if(event.type == "message_reply" && global.game[event.threadID] && global.game[event.threadID].on == true){

if(event.messageReply.messageID === global.game[event.threadID].bid){
 console.log("bal")
if(global.game[event.threadID].turn === event.senderID){
 console.log("sal")
 if(["1", "2","3","4","5","6","7","8","9"].includes(event.body)){
if(global.game[event.threadID].avcell.includes(event.body)){
global.game[event.threadID].avcell.splice(global.game[event.threadID].avcell.indexOf(event.body), 1)

let input2 = event.body*2

global.game[event.threadID].ttrns.map(e => {
  if(e<event.body){
    input2--
  }
})

if(["4", "5", "6"].includes(event.body)){
  input2++
} else if(["7", "8", "9"].includes(event.body)){
  input2 += 2
}

global.game[event.threadID].board = global.game[event.threadID].board.replaceAt("🔲", global.game[event.threadID].bidd, input2-2)
global.game[event.threadID].board2 = global.game[event.threadID].board2.replace(event.body, global.game[event.threadID].bidd)

message.send(global.game[event.threadID].board, (err, infos) => {global.game[event.threadID].bid = infos.messageID
 global.fff.push(infos.messageID)}
 )
 //ttrns.pus

 let winncomb = [
 (global.game[event.threadID].board2[0] === global.game[event.threadID].bidd && global.game[event.threadID].board2[1] === global.game[event.threadID].bidd && global.game[event.threadID].board2[2] === global.game[event.threadID].bidd ) , ( global.game[event.threadID].board2[3] === global.game[event.threadID].bidd && global.game[event.threadID].board2[4] === global.game[event.threadID].bidd && global.game[event.threadID].board2[5] === global.game[event.threadID].bidd ) , ( global.game[event.threadID].board2[6] === global.game[event.threadID].bidd && global.game[event.threadID].board2[7] === global.game[event.threadID].bidd && global.game[event.threadID].board2[8] === global.game[event.threadID].bidd ) , ( global.game[event.threadID].board2[0] === global.game[event.threadID].bidd && global.game[event.threadID].board2[3] === global.game[event.threadID].bidd && global.game[event.threadID].board2[6] === global.game[event.threadID].bidd ) , ( global.game[event.threadID].board2[1] === global.game[event.threadID].bidd && global.game[event.threadID].board2[4] === global.game[event.threadID].bidd && global.game[event.threadID].board2[7] === global.game[event.threadID].bidd ) , ( global.game[event.threadID].board2[2] === global.game[event.threadID].bidd && global.game[event.threadID].board2[5] === global.game[event.threadID].bidd && global.game[event.threadID].board2[8] === global.game[event.threadID].bidd ) , ( global.game[event.threadID].board2[0] === global.game[event.threadID].bidd && global.game[event.threadID].board2[4] === global.game[event.threadID].bidd && global.game[event.threadID].board2[8] === global.game[event.threadID].bidd ) , ( global.game[event.threadID].board2[2] === global.game[event.threadID].bidd && global.game[event.threadID].board2[4] === global.game[event.threadID].bidd && global.game[event.threadID].board2[6] === global.game[event.threadID].bidd) ]


let winncomb2 = 
[
 [
 1,
 2,
 3
 ],
 [
 4,
 5,
 6
 ],
 [
 7,
 8,
 9
 ],
 [
 1,
 4,
 7
 ],
 [
 2,
 5,
 8
 ],
 [
 3,
 6,
 9
 ],
 [
 1,
 5,
 9
 ],
 [
 3,
 5,
 7
 ]
]

let cbid = {"❌":"❎", "⭕":" 🚫"}

 if(winncomb.includes(true)) {
message.unsend(event.messageReply.messageID)

let winl = winncomb2[winncomb.indexOf(true)]

winl.forEach(fn => {

let input2 = fn*2

global.game[event.threadID].ttrns.map(e => {
  if(e<fn){
    input2--
  }
})

if(["4", "5", "6"].includes(fn)){
  input2++
} else if(["7", "8", "9"].includes(fn)){
  input2 += 2
}

global.game[event.threadID].board = global.game[event.threadID].board.replaceAt(global.game[event.threadID].bidd, "✅", input2-2)




})

message.send(global.game[event.threadID].board)




 if(global.game[event.threadID].turn === global.game[event.threadID].player1.id){
 setTimeout(function(){message.send({body:`${global.game[event.threadID].player1.name} you're the winner🏆🥇`, mentions: [{
 tag: global.game[event.threadID].player1.name,
 id: global.game[event.threadID].player1.id,

 }]


 })
 }, 1000)} else {setTimeout(function(){message.send({body:`${global.game[event.threadID].player2.name} just won game because of luck😎❤️`, mentions: [{
 tag: global.game[event.threadID].player2.name,
 id: global.game[event.threadID].player2.id,

 }]


 })}, 1000)}
 global.game[event.threadID].on = false
}else if(global.game[event.threadID].counting === 8){
 setTimeout(function (){message.send("Ahem, Ahem, a draw 😂 There is no winner, game is end now😐")}, 1000)
 global.game[event.threadID].on = false
} else{
 global.game[event.threadID].counting +=1
 message.unsend(event.messageReply.messageID)
 global.game[event.threadID].ttrns.push(event.body)
 if(global.game[event.threadID].turn === global.game[event.threadID].player1.id){
 // console.log(player2.id)
 global.game[event.threadID]. turn = global.game[event.threadID].player2.id
 // console.log(turn)
 global.game[event.threadID].bidd = "⭕"
 } else{
 global.game[event.threadID].turn = global.game[event.threadID].player1.id
 global.game[event.threadID].bidd = "❌"
 }
}



} else{message.reply("Are you blind?? 🌝")}

} else{message.reply("Reply with a number only 🐸\nAnd there is no need for spells 🐸")}
} else{message.reply("It's not your turn 🌝🪓") }


}



}
 }
};

 String.prototype.replaceAt = function (search, replace, from) { if (this.length > from) { return this.slice(0, from) + this.slice(from).replace(search, replace); } return this; }