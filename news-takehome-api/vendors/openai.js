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
  GPT_3_5_TURBO_16K: {
    name: "gpt-3.5-turbo-16k",
    tokenLimit: 16385,
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
    .then((res) => res.choices[0]["message"]["content"]);
}

const TOKEN_COUNT_THRESHOLD_BUFFER = 2000;

function contextSizeAwareCompletion(system = "", message = "") {
  const shouldUseLargerModel =
    estimateTokenCount(system + message) >
    MODELS.DEFAULT_MODEL.tokenLimit - TOKEN_COUNT_THRESHOLD_BUFFER;
  const model = shouldUseLargerModel
    ? MODELS.GPT_3_5_TURBO_16K.name
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
    .then((res) => res.choices[0]["message"]["content"]);
}

module.exports = {
  simpleCompletion,
  contextSizeAwareCompletion,
};
