const axios = require("axios");

module.exports = {
  config: {
    name: "imagine2",
    version: "2.0",
    author: "Samir Thakuri",
    countDown: 5,
    role: 0,
    shortDescription: "Generate Images.",
    longDescription: "Featuring Image Generator AI with Prompt Style and Ratio.",
    category: "ai",
    guide: {
    en: "{pn} <prompt> | <style> | <ratio>\n\nAvailable Ratios: 1:1, 16:9, 9:16\n\nHere's Available Style:\n[1]. IMAGINE_V4_Beta\n[2]. V4_CREATIVE\n[3]. IMAGINE_V3\n[4]. IMAGINE_V1\n[5]. PORTRAIT\n[6]. REALISTIC\n[7]. ANIME\n[8]. ANIME_V2\n[9]. COSMIC\n[10]. COSMIC_V2\n[11]. MARBLE\n[12]. MINECRAFT\n[13]. DISNEY\n[14]. MACRO_PHOTOGRAPHY\n[15]. GTA\n[16]. STUDIO_GHIBLI\n[17]. DYSTOPIAN\n[18]. STAINED_GLASS\n[19]. PRODUCT_PHOTOGRAPHY\n[20]. PSYCHEDELIC\n[21]. SURREALISM\n[22]. GRAFFITI\n[23]. GHOTIC\n[24]. RAINBOW\n[25]. AVATAR\n[26]. PALETTE_KNIFE\n[27]. CANDYLAND\n[28]. CLAYMATION\n[29]. EUPHORIC\n[30]. MEDIEVAL\n[31]. ORIGAMI\n[32]. POP_ART\n[33]. RENAISSANCE\n[34]. FANTASY\n[35]. EXTRA_TERRESTRIAL\n[36]. WOOLITIZE\n[37]. NEO_FAUVISM\n[38]. AMAZONIAN\n[39]. SHAMROCK_FANTASY\n[40]. ABSTRACT_VIBRANT\n[41]. NEON\n[42]. CUBISM\n[43]. BAUHAUS\n[44]. ROCOCO\n[45]. HAUNTED\n[46]. LOGO\n[47]. WATERBENDER\n[48]. FIREBENDER\n[49]. KAWAII_CHIBI\n[50]. FORESTPUNK\n[51]. ELVEN\n[52]. SAMURAI\n[53]. AQUASTIC\n[54]. VIBRAN_VIKING\n[55]. VIBRAN_VIKING\n[56]. ABSTRACT_CITYSCAPE\n[57]. ILLUSTRATION\n[58]. PAINTING\n[59]. ICON\n[60]. RENDER\n[61]. COLORING_BOOK\n[62]. PAPERCUT_STYLE\n[63]. KNOLLING_CASE\n[64]. PIXEL_ART\n[65]. INTERIOR\n[66]. STICKER\n[67]. CYBERPUNK\n[68]. LANDSCAPE\n[69]. ARCHITECTURE\n[70]. GLASS_ART\n[71]. SCATTER\n[72]. RETRO\n[73]. POSTER_ART\n[74]. INK\n[75]. JAPANESE_ART\n[76]. SALVADOR_DALI\n[77]. VAN_GOGH\n[78]. STEAMPUNK\n[79]. RETROWAVE\n[80]. POLY_ART\n[81]. VIBRANT\n[82]. MYSTICAL\n[83]. CINEMATIC_RENDER\n[84]. FUTURISTIC\n[85]. POLAROID\n[86]. PICASO\n[87]. SKETCH\n[88]. COMIC_BOOK"
}
  },
  onStart: async function ({ api, event, args, message }) {
    try {
      const [prompt, style, ratio] = args.join(' ').split('|').map(part => part.trim());

      if (!prompt) {
        return message.reply("⚠️| Invalid input. Please provide prompt.");
      }
      let apiUrl = `https://api.samirthakuri.repl.co/api/generatev3?prompt=${encodeURIComponent(prompt)}`;

      if (style) {
        apiUrl += `&style=${encodeURIComponent(style)}`;
      }

      if (ratio) {
        apiUrl += `&ratio=${encodeURIComponent(ratio)}`;
      }

      const creatingMessage = await message.reply('⏳| Generating Image...\nPlease Wait A Moment.');

      const form = {
        body: `Here's your imagination 🖼️.`
      };

      form.attachment = [];
      form.attachment[0] = await global.utils.getStreamFromURL(apiUrl);
      api.unsendMessage(creatingMessage.messageID);

      message.reply(form);
    } catch (error) {
      console.error(error);
      message.reply("An error occurred while fetching response");
    }
  }
};