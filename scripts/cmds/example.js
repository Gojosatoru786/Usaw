module.exports = {
  config: {
    name: "example",
    aliases: ["exa"],
    version: "1.1",
    author: "NARA iT",
    shortDescription: "example",
    longDescription: "example",
    category: "Guide",
    guide: { en: "" }
  },
  onStart: function ({ message }) {
    message.reply("module.exports = {\n" +
      "  config: {\n" +
      "    name: 'example',\n" +
      "    aliases: [],\n" +
      "    version: '1.0',\n" +
      "    role: 0,\n" +
      "    countDown: 5,\n" +
      "    author: 'YourName',\n" +
      "    shortDescription: 'example',\n" +
      "    longDescription: 'example',\n" +
      "    category: 'command',\n" +
      "    guide: { en: '' }\n" +
      "  },\n" +
      "  onStart: function ({ message, event, api}) {\n" +
      "    // your code here\n" +
      "  }\n" +
      "};");
  }
};