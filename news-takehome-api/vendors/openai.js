const OpenAI = require("openai");
require("dotenv").config();

const { estimateTokenCount } = require("../utils/tokens");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MODELS = {
  DEFAULT_MODEL: {
    name: "gpt-3.5-turbo",
    tokenLimit: 4096,
  },
  GPT_4: {
    name: "gpt-4-32k",
    tokenLimit: 32768,
  },
};

function simpleCompletion(system = "", message = "") {
  return openai.chat.completions
    .create({
      model: MODELS.name,
      messages: [
        {
          role: "system",
          content: system,
        },
        {
          role: "user",
          content: message,
        },
      ],
    })
    .then((res) => res.choices[0]);
}

const TOKEN_COUNT_THRESHOLD_BUFFER = 1000;
function contextSizeAwareCompletion(system = "", message = "") {
  const shouldUseLargerModel =
    estimateTokenCount(system + message) >
    MODELS.DEFAULT_MODEL.tokenLimit - TOKEN_COUNT_THRESHOLD_BUFFER;
  const model = shouldUseLargerModel
    ? MODELS.GPT_4.name
    : MODELS.DEFAULT_MODEL.name;

  return openai.chat.completions
    .create({
      model,
      messages: [
        {
          role: "system",
          content: system,
        },
        {
          role: "user",
          content: message,
        },
      ],
    })
    .then((res) => res.choices[0]);
}

module.exports = {
  simpleCompletion,
  contextSizeAwareCompletion,
};
