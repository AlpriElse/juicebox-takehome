const cheerio = require("cheerio");

module.exports = function htmlContentExtractor(rawArticleHtml) {
  const $ = cheerio.load(rawArticleHtml);

  //  TODO - make this more robust to different page structures
  const articleContent = $("article").text();

  return articleContent;
};
