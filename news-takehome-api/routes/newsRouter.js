const axios = require("axios");
const express = require("express");
const { fetchTopHeadlines } = require("../vendors/news");
const { StandardResponse } = require("../models/http");

const aiContentExtractor = require("../logic/aiContentExtractor");
const htmlContentExtractor = require("../logic/htmlContentExtractor");

const newsRouter = express.Router();

newsRouter.get("/top", (req, res) => {
  fetchTopHeadlines()
    .then((response) => {
      const standardResponse = new StandardResponse(200, false, response);
      standardResponse.send(res);
    })
    .catch((err) => {
      const response = new StandardResponse(500, false, {}, err);
      response.send(res);
    });
});

newsRouter.post("/content", (req, res) => {
  const url = req.body.url;

  axios
    .get(url)
    .then((newsRes) => newsRes.data)
    .then(htmlContentExtractor)
    .then(aiContentExtractor)
    .then((content) => {
      const response = new StandardResponse(200, true, {
        content,
      });
      response.send(res);
    });
});

module.exports = newsRouter;
