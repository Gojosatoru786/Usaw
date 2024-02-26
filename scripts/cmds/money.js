module.exports = {
	config: {
		name: "money",
		aliases: ["check"],
		version: "1.1",
		author: "Bernando",
		countDown: 5,
		role: 0,
		shortDescription: {
			en: "view your money"
		},
		longDescription: {
			en: "view your money or the money of the tagged person"
		},
		category: "economy",
		guide: {
			en: "   {pn}: view your money"
				+ "\n   {pn} <@tag>: view the money of the tagged person"
		}
	},

	langs: {
		en: {
			money: "╭──⭓ 𝗕𝗔𝗟𝗔𝗡𝗖𝗘 \n├⟩\n╰─⭓ %1",
			moneyOf: "╭──⭓ 𝗕𝗔𝗟𝗔𝗡𝗖𝗘 \n├⟩ %1\n╰─⭓ %2"
		}
	},

	onStart: async function ({ message, usersData, event, getLang }) {
		if (Object.keys(event.mentions).length > 0) {
			const uids = Object.keys(event.mentions);
			let msg = "";
			for (const uid of uids) {
				const userMoney = await usersData.get(uid, "money");
				msg += getLang("moneyOf", event.mentions[uid].replace("@", ""), userMoney) + '\n';
			}
			return message.reply(msg);
		}
		const userData = await usersData.get(event.senderID);
		message.reply(getLang("money", userData.money));
	}
};