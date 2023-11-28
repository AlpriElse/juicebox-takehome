const WORD_OR_PUNCTUATION_PATTERN = /[\w'-]+|[.,!?;]/g;

function estimateTokenCount(text) {
  const words = text.match(WORD_OR_PUNCTUATION_PATTERN);
  return words ? words.length : 0;
}

module.exports = { estimateTokenCount };
