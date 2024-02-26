module.exports = {
  config: {
    name: 'flip',
    author: 'Cruizex',
    version: '1.0',
    shortDescription: 'Flip a coin and get heads or tails.',
    longDescription: 'Simulate a coin flip.',
    category: 'fun',
  },

  onStart: async function ({ args, message }) {
    const result = this.flipCoin();
    message.reply(`The coin landed on: ${result}`);
  },

  flipCoin: function () {
    return Math.random() < 0.5 ? 'Heads' : 'Tails';
  }
};