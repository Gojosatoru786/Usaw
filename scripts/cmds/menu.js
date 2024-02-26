module.exports = {
  config: {
    name: 'menu',
    version: '1.1',
    author: 'رايلي نيلسون',
    countDown: 60,
    role: 0,
    shortDescription: '',
    category: 'box chat',
    guide: '{pn}',
  },
  onStart: async function ({ message, event, usersData, api }) {
    if (event.isGroup) { 
      const { getPrefix } = global.utils;
      const p = getPrefix(event.threadID);
      const img = "";
      api.sendMessage(
        `[AI]
${p}ai: Interact with an AI chatbot.
${p}aimoji: Generate AI-generated emojis.
${p}dream: Generate image with text.
${p}gpt: Chat with an AI using GPT technology.
${p}imagine: Create imaginative text based on a prompt.
${p}sim: Chat Bot simsimi.

[economy]
${p}bal: Check your balance in the economy system.
${p}bank: Access the banking system for virtual currency.
${p}claim: Claim rewards in the economy system.
${p}give: Give virtual currency to another user.

[Fun]
${p}cdp: Couple's profile picture.
${p}clap: Add clap emojis between words in a sentence.
${p}emojimix: Mix emojis.
${p}facts: Retrieve interesting facts.
${p}fancy: Change text to fancy text.
${p}jail: Put a user in "jail" with an image.
${p}lyrics: Search for song lyrics.
${p}meme: Generate a random meme.
${p}nice: React with a "Nice!" message.
${p}play: Play music with lyrics.
${p}rand: Generate a random number or choose from a list.
${p}say: Text to speech.
${p}tmoji: Convert text to emoji characters.
${p}typ: Make bot typing.

[Game]
${p}flag: Generate a random country flag.
${p}quiz: Start a quiz game.
${p}rp: Roleplay with the bot.
${p}slot: Play a slot machine game.

[Image]
${p}avatar: Generate anime avatar.
${p}batslap: Create a "batslap" meme.
${p}cat: Show random cat image.
${p}dog: Show random dog image.
${p}fbcover: Generate a Facebook cover image.
${p}hubble: Retrieve Hubble Space Telescope images.
${p}profile: View your or another user's profile picture.
${p}trigger: Add a "triggered" effect to an image.
${p}waifu: Get a random waifu image.

[Islam]
${p}shalat: Check prayer times for your location.
${p}surah: Get information about a Quranic surah.

[Media]
${p}fb: Download Facebook videos.
${p}tiktok: Download TikTok videos.
${p}ytb: Download YouTube videos.

[Rank]
${p}crc: Edit rank card.
${p}rank: Check your or another user's rank.

[Utility]
${p}help: Get help and information about a command.
${p}math: Perform mathematical calculations.
${p}ping: Check the bot's response time.
${p}tid: Retrieve the thread ID.
${p}translate: Translate text between languages.
${p}uid: Retrieve the user ID.
${p}weather: Get the weather forecast.

[Wiki]
${p}emojimean: Get the meaning of an emoji.
${p}wiki: Search for information on Wikipedia.

Untuk mempelajari cara menggunakan perintah tertentu, ketik
${p}help <nama command>. Semoga lebih ringkas!`,
        event.senderID
      );
      message.reply('Daftar perintah berhasil dikirim ke kotak masuk grup.');
    } else {
      api.sendMessage('Perintah ini hanya dapat digunakan di grup.', event.threadID);
    }
  },
};