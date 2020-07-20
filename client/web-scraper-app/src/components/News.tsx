import React, { useState } from "react";
import { Loader, Button, Divider, Modal } from "semantic-ui-react";
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
  const [saveState, setSaveState] = useState(false);
  const [modalState, setModalState] = useState(false);

  const loadNewsArticle = async () => {
    console.log("Loading scraper...");
    setloading(true);
    setNewsData(undefined);
    const res = await fetch("http://localhost:5500/news");
    const news = await res.json();
    console.log("news ===> ", news);
    const saved = await fetch("http://localhost:5500/saved-data");
    setloading(false);
    setNewsData(news);
  };
  const SaveData = async () => {
    setSaveState(true);
    await fetch("http://localhost:5500/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newsData }),
    });
    setModalState(true);
    setSaveState(false);
  };
  return (
    <>
      <div style={{ padding: "1.5em" }}>
        <Button disabled={loading} primary onClick={() => loadNewsArticle()}>
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
            <Button
              disabled={saveState}
              color="green"
              onClick={() => SaveData()}
            >
              Save
            </Button>
          </div>
          <Modal
            size="small"
            open={modalState}
            onClose={() => setModalState(false)}
          >
            <Modal.Header>Successful</Modal.Header>
            <Modal.Content>
              <p>Aritcle saved!</p>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={() => setModalState(false)}>Close</Button>
            </Modal.Actions>
          </Modal>
        </>
      )}
    </>
  );
};

export default News;
