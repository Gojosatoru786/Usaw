const { Aki } = require('aki-api');

module.exports = {
	config: {
		name: "aki",
		version: "1.0",
		author: "Lou Fi",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "",
			en: "Akinator Game"
		},
		longDescription: {
			vi: "",
			en: "Play a game with Akinator"
		},
		category: "Games",
		guide: {
			en: "For yes =0\nFor no = 1\n For maybe=2\nFor I don't know = 3\n For maybe not =4"
		},
		envConfig: {
			reward: 25
		}
	},

	onStart: async function ({ message, event, commandName }) {
		try {
			const region = 'en';
			const aki = new Aki({ region });
			await aki.start();

			const question = aki.question;
			const answers = aki.answers;

			const timeout = 4000 * 1000;

			message.reply({
				body: question
			}, (err, info) => {
				if (err) {
					console.error("Error sending question:", err);
					return;
				}

				global.GoatBot.onReply.set(info.messageID, {
					commandName,
					messageID: info.messageID,
					author: event.senderID,
					aki: aki // Store the Akinator instance along with the reply info
				});

				// Set a timeout for 40 seconds to delete the question and send the answer
				setTimeout(async () => {
					if (global.GoatBot.onReply.has(info.messageID)) {
						global.GoatBot.onReply.delete(info.messageID);

						await aki.win();

						const firstGuess = aki.answers[0];
						const guessCount = aki.guessCount;

						message.send({
							body: `Time's up!\n\nFirst guess: ${firstGuess.name}\nDescription: ${firstGuess.description}\n\nGuess count: ${guessCount}`
						});
					}
				}, timeout);
			});
		} catch (err) {
			console.error("Error starting Akinator:", err);
			message.reply("An error occurred. Please try again later.");
		}
	},

	onReply: async function ({ message, event, Reply }) {
		const { messageID, aki } = Reply;
		const userAnswer = event.body.trim();

		// Map Arabic responses to their corresponding answer options
		const arabicResponses = {
			'yes': 0,
			'no': 1,
			'maybe': 2,
			"I don't know": 3,
			'maybe not': 4
		};

		// Check if the user's answer is valid
		if (arabicResponses.hasOwnProperty(userAnswer)) {
			const akiAnswer = arabicResponses[userAnswer];

			await aki.step(akiAnswer);

			if (aki.progress >= 70 || aki.currentStep >= 78) {
				await aki.win();

				const firstGuess = aki.answers[0];
				const guessCount = aki.guessCount;
				const pictureURL = firstGuess.absolute_picture_path;

				message.send({
					body: `Your answer: ${userAnswer}\n\nFirst guess: ${firstGuess.name}\nDescription: ${firstGuess.description}\n\nGuess count: ${guessCount}`, attachment: await global.utils.getStreamFromURL(pictureURL)
				});

				global.GoatBot.onReply.delete(messageID);
			} else {
				const question = aki.question;
				const answers = aki.answers;

				message.send({
					body: question
				}, (err, info) => {
					if (err) {
						console.error("Error sending question:", err);
						return;
					}

					global.GoatBot.onReply.set(info.messageID, {
						commandName: Reply.commandName,
						messageID: info.messageID,
						author: event.senderID,
						aki: aki // Store the Akinator instance along with the reply info
					});
				});
			}
		} else {
			// Handle invalid answer
			message.send({
				body: "Please enter a valid response (yes, no, maybe, I don't know, maybe not)."
			});
		}
	}
};