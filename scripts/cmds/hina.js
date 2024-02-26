const axios = require("axios");

module.exports = {
  config: {
    name: "hina",
    category: "ai",
  },
  onStart: async function ({ message, args }) {
    const a = "vyturex";
    const response = await axios.get(
      `https://simsimi.${a}.com/chat?ques=${args.join(" ")}`
    );
    message.reply(response.data);
  },
};