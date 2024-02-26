const fs = require("fs");

module.exports = {
	config: {
		name: "BOT",
		version: "1.3",
		author: "NARA iT",
		countDown: 5,
		role: 0,
		shortDescription: "",
		longDescription: "",
		category: "Info Bot",
		guide: {
		}
	},

	langs: {
		en: {
			bot: "╭⭓⟩» ⚙ Bot prefix: {p} \n╰─⭓│⚙ || NARA iT || ⚙│"
		}
	},

	onStart: async function () {},
	onChat: async function ({ event, message, getLang }) {
		if (event.body && event.body.toLowerCase() === "bot")
			return () => {
				return message.reply(getLang("bot"));
			};
	}
};