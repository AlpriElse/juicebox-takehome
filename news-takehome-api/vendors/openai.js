const OpenAI = require("openai");
require("dotenv").config();

const { estimateTokenCount } = require("../utils/tokens");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const RESPONSE_FORMAT = {
  JSON: "json_object",
  TEXT: "text",
};

const MODELS = {
  DEFAULT_MODEL: {
    name: "gpt-3.5-turbo",
    tokenLimit: 4096,
  },
  GPT_3_5_TURBO_16K: {
    name: "gpt-3.5-turbo-1106",
    tokenLimit: 16385,
  },
};

function simpleCompletion(
  system = "",
  message = "",
  model = MODELS.DEFAULT_MODEL,
  responseFormat = RESPONSE_FORMAT.TEXT
) {
  return openai.chat.completions
    .create({
      model: model.name,
      response_format: { type: responseFormat },
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

function contextSizeAwareCompletion(
  system = "",
  message = "",
  responseFormat = "text"
) {
  const shouldUseLargerModel =
    estimateTokenCount(system + message) >
    MODELS.DEFAULT_MODEL.tokenLimit - TOKEN_COUNT_THRESHOLD_BUFFER;
  const model = shouldUseLargerModel
    ? MODELS.GPT_3_5_TURBO_16K.name
    : MODELS.DEFAULT_MODEL.name;

  return openai.chat.completions
    .create({
      model,
      response_format: { type: responseFormat },
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
  RESPONSE_FORMAT,
  MODELS,
  simpleCompletion,
  contextSizeAwareCompletion,
};
