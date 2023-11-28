const axios = require("axios");

const BASE_URL = "https://newsapi.org/v2";
const NEWS_API_KEY = process.env.NEWS_API_KEY;

const newsApiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: NEWS_API_KEY,
  },
});

function fetchTopHeadlines(country = "us") {
  console.log("hi");
  return newsApiClient
    .get("/top-headlines", {
      params: {
        country,
      },
    })
    .then((res) => res.data);
}

module.exports = {
  fetchTopHeadlines,
};
