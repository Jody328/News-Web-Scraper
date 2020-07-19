import React, { useState } from "react";
import { Loader, Button, Divider } from "semantic-ui-react";
import styled from "styled-components";

type newsType = {
  heading: string;
  meta: string;
  imageURL: string;
  article: string;
};

const News = () => {
  const [newsData, setNewsData] = useState<newsType>();
  const [loading, setloading] = useState(false);
  const loadNewsArticle = async () => {
    console.log("Loading scraper...");
    setloading(true);
    setNewsData(undefined);
    const res = await fetch("http://localhost:5500/news");
    const news = await res.json();
    console.log("news ===> ", news);
    const saved = await fetch("http://localhost:5500/saved-data");
    // console.log("Saved data ===> ", saved);
    setloading(false);
    setNewsData(news);
  };
  const SaveData = async () => {
    await fetch("http://localhost:5500/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newsData }),
    });
  };
  return (
    <>
      <div style={{ padding: "1.5em" }}>
        <Button primary onClick={() => loadNewsArticle()}>
          Scrape Latest News
        </Button>
        <Divider />
      </div>
      {loading && (
        <Loader active inline="centered">
          Fetching data...
        </Loader>
      )}
      {newsData && (
        <>
          <div style={{ width: "600px", margin: "auto" }}>
            <img
              src={newsData.imageURL}
              alt="news_article_image"
              width="500px"
            />
            <h2>{newsData.heading}</h2>
            <p>{newsData.meta}</p>
            <p>{newsData.article}</p>
            <Button color="green" onClick={() => SaveData()}>
              Save
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default News;
