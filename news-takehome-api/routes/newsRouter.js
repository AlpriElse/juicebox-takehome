const axios = require("axios");
const express = require("express");
const { fetchTopHeadlines } = require("../vendors/news");
const { StandardResponse } = require("../models/http");

const aiContentExtractor = require("../logic/content-extraction/aiContentExtractor");
const contentAndEntitySerializer = require("../logic/content-serialization/contentAndEntitySerializer");
const htmlContentExtractor = require("../logic/content-extraction/htmlContentExtractor");
const aiNamedEntityRecognizer = require("../logic/named-entity-recognition/aiNamedEntityRecognizer");

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
      return new Promise((resolve, reject) => {
        aiNamedEntityRecognizer(content)
          .then((namedEntities) =>
            resolve({
              content,
              namedEntities,
            })
          )
          .catch((e) => reject(e));
      });
    })
    .then(({ content, namedEntities }) => {
      const serializedContentAndNamedEntities = contentAndEntitySerializer(
        content,
        namedEntities
      );

      return {
        content,
        namedEntities,
        serializedContentAndNamedEntities,
      };
    })
    .then(({ content, namedEntities, serializedContentAndNamedEntities }) => {
      const response = new StandardResponse(200, true, {
        content,
        namedEntities,
        serializedContentAndNamedEntities,
      });
      response.send(res);
    });
});

module.exports = newsRouter;
