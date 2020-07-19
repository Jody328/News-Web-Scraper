const express = require("express");
const app = express();
const port = 5500;

const bodyParser = require("body-parser");
const scrapers = require("./scrapers");
const writeFileP = require("write-file-p");
const readJson = require("read-json-file");

app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // disabled for security on local
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/news", async (req, res) => {
  const newsData = await scrapers.scrapeNews(
    "https://www.iol.co.za/news/south-africa"
  );
  console.log("Scraped res ===>", { newsData });
  res.send(newsData);
});

app.get("/saved-data", async (req, res) => {
  const savedData = await readJson(
    `${__dirname}/data/output.json`,
    (error, data) => {
      if (error) {
        throw error;
      }
      console.log("saved data ===> ", data);
    }
  );
  res.send(savedData || {});
});

app.post("/save", async (req, res) => {
  console.log("Body ===>", req.body);
  writeFileP.sync(`${__dirname}/data/output.json`, req.body, (err, data) => {
    console.log(err || data);
  });
  res.send("success");
});

app.listen(port, () =>
  console.log(`App is listening at http://localhost:${port}`)
);
