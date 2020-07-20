const puppeteer = require("puppeteer");

const scrapeNews = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const [el] = await page.$x(
    '//*[@id="root"]/div/div/main/div[2]/div[3]/article/a/h2'
  );
  const text = await el.getProperty("textContent");
  const heading = await text.jsonValue();

  const [el2] = await page.$x(
    '//*[@id="root"]/div/div/main/div[2]/div[3]/article/div/a[2]/img'
  );
  const src = await el2.getProperty("src");
  const imageURL = await src.jsonValue();

  const [el3] = await page.$x(
    '//*[@id="root"]/div/div/main/div[2]/div[3]/article/a/p[1]'
  );
  const metatxt = await el3.getProperty("textContent");
  const meta = await metatxt.jsonValue();

  const [el4] = await page.$x(
    '//*[@id="root"]/div/div/main/div[2]/div[3]/article/a/p[2]'
  );
  const articletxt = await el4.getProperty("textContent");
  const article = await articletxt.jsonValue();

  browser.close();

  return { heading, imageURL, meta, article };
};

module.exports = {
  scrapeNews,
};
