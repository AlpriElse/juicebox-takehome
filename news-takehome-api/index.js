const express = require("express");
require("dotenv").config();

const { StandardResponse } = require("./models/http");

const PORT = process.env.PORT || 3001;
const app = express();

app.get("/healthcheck", (req, res) => {
  const response = new StandardResponse(200, true);
  response.send(res);
});

app.get("/test", (req, res) => {
  const response = new StandardResponse(200, true, { text: "some text" });
  response.send(res);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
