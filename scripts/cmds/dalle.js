// Import necessary modules and libraries
const axios = require("axios");
const { getStreamFromURL } = global.utils;
const async = require("async");

// Create an asynchronous queue for image generation tasks
const queue = async.queue(async (task, callback) => {
  // Extract relevant information from the task
  const { message, prompt, ratio = "1:1", msg } = task;
  // Initialize an array to store responses
  let response = [];
  try {
    // Loop to send requests for image generation
    for (let x = 0; x < 4; x++) {
      // Make a POST request to the Dall-e 3 API
      const res = await axios.post("https://dalle-3-1rit.onrender.com/dalle/3", { prompt: prompt.trim(), ratio }, { headers: { authorization: "Bearer eyqwertyuiop69jsuswaltersex" } })
      const stream = await getStreamFromURL(res.data.generatedImage.data)
      response.push(stream)
    };

    // Reply to the message with a success message and the generated image links
    await message.reply({ body: "Image successfully generated! ✅", attachment: response })
  } catch (error) {
    // Handle errors by replying with an apology and an error message
    message.reply("Apologies, an unexpected error occurred during the image generation process.")
  } finally {
    response.length = 0
  }

  // Invoke the callback to signal the completion of the task
  callback();
}, 1);

// Define the configuration for the Dall-e command
const config = {
  name: "dalle",
  author: "Jsus",
  countDown: 15,
  category: "box chat",
  shortDescription: { en: "Experience the magic of Dall-e 3 image generation!" },
  longDescription: {
    en: "Dall-e 3 is a cutting-edge tool that crafts unique and stunning images based on your prompts. Explore the possibilities of creative expression through this advanced AI technology."
  },
  guide: {
    en: "{pn} <prompt> | [ratio]"
  }
}

// Define the onStart function to handle the initiation of the Dall-e command
async function onStart({ event, message, args }) {
  // Split the arguments to extract the prompt and ratio
  let [prompt, ratio = "1:1"] = args.join(" ").split("|")

  // Check if a prompt is provided; otherwise, reply with a prompt requirement
  if (!prompt) return message.reply("Please include a prompt for image generation.");

  // Check if the specified ratio is valid; otherwise, proceed with the default 1:1 ratio
  if (!["1:1", "16:9", "9:16"].includes(ratio.trim())) {
    message.reply("Invalid ratio specified. Proceeding with the default 1:1 ratio.")
    ratio = "1:1"
  }

  // Reply to the message indicating the start of the image generation process
  const msg = message.reply("Generating image, please wait for the magic to unfold.")

  // Push the task to the queue for asynchronous processing
  queue.push({ message, prompt, ratio, msg })
}

// Export the configuration and onStart function for external use
module.exports = { config, onStart };