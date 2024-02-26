module.exports = {
  config: {
    name: "joke2",
    aliases: ["jokes"],
    version: "1.0",
    author: "EDINST",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "Tell a random joke."
    },
    longDescription: {
      en: "This command tells a random joke from a predefined list."
    },
    category: "Fun",
    guide: {
      en: "Use the command to get a random joke."
    }
  },
  langs: {
    en: {
      gg: ""
    }
  },

  onStart: async function ({ api, event, args, message }) {
    try {
      const jokes = [
        "Kenapa monyet enggak pake kacamata? Karena dia punya kacamata alami.",
        "Kenapa ikan gak bisa pakai sepatu? Karena mereka punya sirip!",
        "Kenapa kuda dilarang masuk sekolah? Karena diajak pacaran terus!",
        "Apa yang dilakukan sapi di rumah? Ngerumputi!",
        "Apa bedanya siput dengan anak kecil? Siput naik sepeda, anak kecil sepeda isteri!",
        "Kenapa tomat merah? Karena merah sayang sama biru.",
        "Kenapa cicak naik sepeda? Biar cepat sampai.",
        "Apa yang dilakukan kodok di perpustakaan? Ngelompat-lompat!",
        "Kenapa semut gak bisa jualan online? Karena gak punya MB!",
        "Kenapa ayam gak bisa main basket? Karena selalu dribel!",
        "Kenapa jerapah gak bisa main kelereng? Karena terlalu tinggi!",
        "Apa yang dilakukan kucing di komputer? Nge-mouse!",
        "Kenapa kelinci gak bisa marah? Karena selalu sabit!",
        "Kenapa sapi gak bisa main piano? Karena gak punya jari!",
        "Apa yang dilakukan ular di musim dingin? Ngelap air mata!",
        "Kenapa bunga malu-malu? Karena takut disundul!",
        "Kenapa telur gak pernah ketawa? Karena gak punya mulut!",
        "Apa yang dilakukan kambing di atas atap? Menge-meng-kambing!",
        "Kenapa bebek gak suka berdiri? Karena gak bisa lesehan!",
        "Kenapa singa gak bisa pake komputer? Karena punya sambung rambut!"
      ];

      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

      api.sendMessage(randomJoke, event.threadID);
    } catch (error) {
      console.error(error);
    }
  }
};