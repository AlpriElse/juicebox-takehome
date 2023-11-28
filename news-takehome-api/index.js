const express = require("express");
require("dotenv").config();

const { StandardResponse } = require("./models/http");
const newsRouter = require("./routes/newsRouter");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use("/v1/news", newsRouter);

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
