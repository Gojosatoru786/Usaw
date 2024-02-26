const fs = require("fs");

module.exports = {
  config: {
    name: "pokeinfo",
    version: "1.0",
    author: "Shikaki",
    countDown: 20,
    role: 0,
    shortDescription: "Get information about a Pokémon",
    longDescription: "Get information about a Pokémon including its picture and stats",
    category: "🐍 Pokémon",
    guide: "{pn} [Pokemon Name]",
  },

  onStart: async function ({ args, message, event }) {
    const pokemonName = args[0].toLowerCase(); // Convert user input to lowercase
    const pokos = JSON.parse(fs.readFileSync("pokos.json", "utf8"));

    const pokemonData = pokos.find((pokemon) => pokemon.name.toLowerCase() === pokemonName); // Convert JSON name to lowercase

    if (pokemonData) {
      try {
        const image = pokemonData.image || ""; // Get the image as a string

        if (typeof image === "string" && image.trim() !== "") {
          const form = {
            body: `❏ Name: ${pokemonData.name}\n❏ Type: ${pokemonData.type}\n❏ HP: ${pokemonData.HP}\n❏ Attack: ${pokemonData.Att}\n❏ Defense: ${pokemonData.Def}\n❏ Attack Speed: ${pokemonData["Attack speed"]}\n❏ Defense Speed: ${pokemonData["Defence speed"]}\n❏ Speed: ${pokemonData.Speed}\n❏ Abilities: ${pokemonData.Abilities}`,
            attachment: await global.utils.getStreamFromURL(image),
          };
          message.send(form);
        } else {
          message.reply("No valid image found for this Pokémon.");
        }
      } catch (e) {
        console.log(e);
        message.reply("Server busy. Please try again later.");
      }
    } else {
      message.reply(`Pokémon with the name "${args[0]}" not found.`);
    }
  },
};