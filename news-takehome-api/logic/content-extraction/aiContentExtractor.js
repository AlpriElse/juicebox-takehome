const { contextSizeAwareCompletion } = require("../../vendors/openai");

const SYSTEM_PROMT = `
You will be given HTML from a news article. Your task is to remove the article content from the HTML.

Only return the article content without HTML.
`;

module.exports = function aiContentExtractor(rawArticleHtml) {
  const userMessage = `Here's the content to extract: 
  ${rawArticleHtml}
  `;
  return contextSizeAwareCompletion(SYSTEM_PROMT, userMessage);
};
