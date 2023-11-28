const express = require("express");
const { fetchTopHeadlines } = require("../vendors/news");
const { StandardResponse } = require("../models/http");

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

newsRouter.post("/content", (req, res) => {});

module.exports = newsRouter;
