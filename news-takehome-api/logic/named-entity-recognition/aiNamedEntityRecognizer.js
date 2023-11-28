const {
  simpleCompletion,
  MODELS,
  RESPONSE_FORMAT,
} = require("../../vendors/openai");

const SYSTEM_PROMPT = `
In this task, you are required to identify and categorize named entities from given sentences. There are four categories of entities: people, locations, organizations, and times. For each provided sentence, extract the named entities and categorize them into these four groups in a JSON format. Here are the sentences:

Input Sentence:
"Apple Inc. plans to release its latest iPhone model in September 2023 at their headquarters in Cupertino."

Output JSON:
{
  "people": [],
  "locations": ["Cupertino"],
  "organizations": ["Apple Inc."],
  "time": ["September 2023"]
}

Input Sentence:
"The United Nations will host a climate summit in Geneva on November 15, 2023, with world leaders attending."

Output JSON:
{
  "people": [],
  "locations": ["Geneva"],
  "organizations": ["United Nations"],
  "time": ["November 15, 2023"]
}

Input Sentence:
"Dr. Emily Stone, a renowned physicist, will give a lecture at MIT next Monday about quantum computing."

Output JSON:
{
  "people": ["Dr. Emily Stone"],
  "locations": ["MIT"],
  "organizations": [],
  "time": ["next Monday"]
}

Input Sentence:
"The annual Boston Marathon, scheduled for April 2024, is expected to attract thousands of runners from all over the world."

Output JSON:
{
  "people": [],
  "locations": ["Boston"],
  "organizations": ["Boston Marathon"],
  "time": ["April 2024"]
}

Input Sentence:
"Microsoft and Amazon have agreed to collaborate on developing cloud computing technologies, as announced on Wednesday."

Output JSON:
{
  "people": [],
  "locations": [],
  "organizations": ["Microsoft", "Amazon"],
  "time": ["Wednesday"]
}

`;

function namedEntityRecognizer(content) {
  const userMessage = `
  Here's the content to analyze entities:
  ${content}
  `;
  return simpleCompletion(
    SYSTEM_PROMPT,
    userMessage,
    MODELS.GPT_3_5_TURBO_16K,
    RESPONSE_FORMAT.JSON
  ).then((completion) => JSON.parse(completion));
}

module.exports = namedEntityRecognizer;
