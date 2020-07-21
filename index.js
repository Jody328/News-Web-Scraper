const express = require("express");
const app = express();
const port = 5500;

const bodyParser = require("body-parser");
const scrapers = require("./scrapers");
const writeFileP = require("write-file-p");
const readJson = require("read-json-file");
const path = require("path");

app.use(express.static(path.join(__dirname, "build")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // disabled for security on local
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/news", async (req, res) => {
  try {
    const newsData = await scrapers.scrapeNews(
      "https://www.iol.co.za/news/south-africa"
    );
    res.send(newsData);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get("/saved-data", async (req, res) => {
  await readJson(`${__dirname}/data/output.json`, (error, data) => {
    if (error || data === undefined) {
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});

app.post("/save", async (req, res) => {
  await readJson(`${__dirname}/data/output.json`, (error, data) => {
    if (error || data === undefined) {
      writeFileP.sync(
        `${__dirname}/data/output.json`,
        req.body,
        (err, data) => {
          console.log(err || data);
        }
      );
      res.sendStatus(200);
    } else {
      const bodyItem = req.body[0];
      data.push(bodyItem);
      writeFileP.sync(`${__dirname}/data/output.json`, data, (err, data) => {
        console.log(err || data);
      });
      return res.send(data);
    }
  });
});

app.listen(port, () =>
  console.log(`App is listening at http://localhost:${port}`)
);
