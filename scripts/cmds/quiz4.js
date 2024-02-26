const fs = require("fs");

module.exports = {
  config: {
    name: "quiz4",
    aliases: ["qz4"],
    version: "1.0",
    author: "EDINST",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "Start a quiz"
    },
    longDescription: {
      en: "Start a quiz and answer multiple choice questions"
    },
    category: "games",
    guide: {
      en: "Type 'startquiz' to start the quiz"
    }
  },
  langs: {
    en: {
      gg: "Nice answer! You earned 10 points."
    }
  },

  onStart: async function({ api, event, args, message }) {
    try {
      const data = JSON.parse(fs.readFileSync("./quiz.json", "utf-8"));

      const questions = data.questions;
      const score = 0;

      sendMessage(api, event.threadID, "Are you ready? Let's start the quiz!");
      await delay(1000);

      for (let i = 0; i < questions.length; i++) {
        const question = questions[i].question;
        const options = questions[i].options;
        const correctAnswer = questions[i].correctAnswer;

        sendMessage(api, event.threadID, question);

        const optionsMessage = Object.keys(options)
          .map((option) => `${option}: ${options[option]}`)
          .join("\n");
        sendMessage(api, event.threadID, optionsMessage);

        const userAnswer = await getUserAnswer(api, event.threadID);

        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
          sendMessage(api, event.threadID, "Nice answer! You earned 10 points.");
          score += 10;
        } else {
          sendMessage(api, event.threadID, "Wrong answer!");
        }

        await delay(1000);
      }

      sendMessage(api, event.threadID, `Quiz finished! Your score: ${score}`);
    } catch (error) {
      console.error(error);
      sendMessage(api, event.threadID, "An error occurred while running the quiz.");
    }
  }
};

function sendMessage(api, threadID, message) {
  api.sendMessage(message, threadID);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getUserAnswer(api, threadID) {
  const response = await api.waitForMessage((event) => event.body, {
    threadID: threadID
  });

  return response.body;
}