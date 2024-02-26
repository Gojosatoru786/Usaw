const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const KievRPSSecAuth = "FABiBBRaTOJILtFsMkpLVWSG6AN6C/svRwNmAAAEgAAACAqzqwVrP6gRIASj9l2SnjoV40Trnq0QcSYnh2uVEb8b2sQ5k++U53hkifJ+gakG59kSVVbrQH4qBKJyCr0JxfwL/x/FP2IoB7HRkniQzOO3W+r2f7mpjGUX3PE5oAvt0mcCHapaw/oHc1AzfqCum4Sl03fLOcslpNX7ECZe8qlD46TWYNnsBpXzqsyux13QJsD/eLYI+hhgZcDu9WGBFZQqs9eoGLUQEiFb/9yXFmOk36HfHwY20Nn1Tq/Mb6i0PAQBwQSxumzNRG5XOhf8+xhaGsasL55d5mHZDBcT6aMGS29aMr+Gn9YiM7eWNZaVGfha7Z+7n7FNMWBWGoyb9mkLJW/35PrsNMTmTAwSk5V86lBI/2ngMMshLaGb60UCyjQd0ozsO8UZfON3I9QXo3IniySpqXKYwn0Z4NjDC/KT7UQHv0klVZ0mImGDjt2755hCBzNV5xIT8P3/VqMGkkWqSheH3fEhiShguFvVns7cEElwjI9FGOrTX2+RKi5Vuf2uUnRsPeVhQH+MqePthKMAEiV2Q7wwG/EeDro9flSqhN70utYApsrc/Ccih3AYSuj2v11ADO3MJkutOIhLeDQwxUa3hZ9VcJ7EXwdYQn5W6BDuqAhV+FEmu0jto7Vw3vRj9EvqualonhtkL9QylrZgXAuG5GrQNP/b7J29ems4+6VRFg2H0woY+4KoDcjfgAah2vQRegelNKetAWo87xigbggkqfgQpbdX5r5yVoer56q7Muio4tKHqpg1RnmQGVQHCcAA+PH6xdas4VAZqKZ4ZSSrhjrtJJXr9NOHrVphz0BiQJmIfeNjTCmXg9e6FByalaMxHxq2c8dWkcgSZbUFvOYwdwxQgUU922UVWEIiogyA+XRO/d+3Pc1obFZIHs3JO3uq62/rJrbd+id9qdP4e1B5I0hpe5zTSnFfXeyQ44cwg3xQkZc1UeMffquWYoEeKGs5PZUPKFO3fBOr0pg1jdth4E/YPK1KpsrWuJjNAZCJW0AjzPw78CtNBxuwlaA+aPr+u/u4yToUAr9Yi8BYO8+Aq6Xf/F3Y5PG7wq4J4bjoQ3qY79i7J+DSwjHfGVfGHFO3LQMBffT7qlVnHC/9vOh6Bb1VMdYjYHsz/3Ovz4sED8zDYdTlBuKN8OznKTXcWh69wPuOmwhc2VnXzlC/zk13dlpmCXR8x4+fTxOCmjmVivSOzEP10d+1L7a7xUhdw1M0foeXxeHMASKHlhwq9e3m4VwDb8f4cpQX1bRc41qDbwc5jabL1jwvp3x5NAz9Z9Vm3QfAB49hZkXL9W3WbGEu2TJRpkMeUx+G42g/5CspfkI/0v/qos7PNYJ4bWBvS2FowyObJrPWKZFkp7zk8PgVY9rzPPqhm/NdslM6GdViXIcPJ0Q+RXdV9SpVXf52wNJCA3sF0b0UAO3lelyJ0+CwY5EyJlzOLytb292D";
const _U = "1TdSoZ3ewYJWZjnfvy5tfU5Srt-V6uf3-NMS11nulelVo4Eex19Ot31ueLhvR2C_HVqxIvn3Ux1TA0wR2RHqxSqxA7B4x2Q0fgiu6BkwUGZMnoxIQiB8t_uOYcySgx-UMZ4UpXUnkaNn3R8kWCDM-UWnyj05S7WBtzxGerZ_thZoooMykB-0TqpufVi1IyYRp3opZt5rYQgiVrMr__oCXyA";
module.exports = {
  config: {
    name: "dallex",
    aliases: ["dallex"],
    version: "1.0.2",
    author: "Samir Œ ",
    role: 0,
    countDown: 5,
    shortDescription: {
      en: "dalle"
    },
    longDescription: {
      en: ""
    },
    category: "dalle",
    guide: {
      en: "{prefix}dalle <search query> -<number of images>"
    }
  },

  onStart: async function ({ api, event, args }) {

const uid = event.senderID
    const permission = [`${uid}`];
    if (!permission.includes(event.senderID)) {
      api.sendMessage(
        "You don't have enough permission to use this command. Only admin can do it.",
        event.threadID,
        event.messageID
      );
      return;
    }

    const keySearch = args.join(" ");
    const indexOfHyphen = keySearch.indexOf('-');
    const keySearchs = indexOfHyphen !== -1 ? keySearch.substr(0, indexOfHyphen).trim() : keySearch.trim();
    const numberSearch = parseInt(keySearch.split("-").pop().trim()) || 4;

    try {
      const res = await axios.get(`https://api-dalle-gen.onrender.com/dalle3?auth_cookie_U=${_U}&auth_cookie_KievRPSSecAuth=${KievRPSSecAuth}&prompt=${encodeURIComponent(keySearchs)}`);
      const data = res.data.results.images;

      if (!data || data.length === 0) {
        api.sendMessage("No images found for the provided query.", event.threadID, event.messageID);
        return;
      }

      const imgData = [];
      for (let i = 0; i < Math.min(numberSearch, data.length); i++) {
        const imgResponse = await axios.get(data[i].url, { responseType: 'arraybuffer' });
        const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
        await fs.outputFile(imgPath, imgResponse.data);
        imgData.push(fs.createReadStream(imgPath));
      }

      await api.sendMessage({
        attachment: imgData,
        body: `Here's your generated image`
      }, event.threadID, event.messageID);

    } catch (error) {
      console.error(error);
      api.sendMessage("cookie of the command. Is expired", event.threadID, event.messageID);
    } finally {
      await fs.remove(path.join(__dirname, 'cache'));
    }
  }
};