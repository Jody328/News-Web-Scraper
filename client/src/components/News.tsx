import React, { useState } from "react";
import { Loader, Button, Divider, Modal } from "semantic-ui-react";
import styled from "styled-components";

const NewsWrapper = styled.div`
  width: 600px;
  margin: auto;
  @media (max-width: 768px) {
    width: 200px;
    margin: auto;
    Button {
      margin-top: 0.8em;
    }
  }
`;
const ImageWrapper = styled.div`
  @media (max-width: 768px) {
    img {
      width: 200px;
    }
  }
`;
const TextWrapper = styled.div`
  @media (max-width: 768px) {
    h2 {
      font-size: 1.2rem;
    }
  }
`;
const ButtonWrapper = styled.div`
  margin-top: 1em;
`;

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
  const [modalMsg, setModalMsg] = useState("");

  const loadNewsArticle = async () => {
    setloading(true);
    setNewsData(undefined);
    const res = await fetch("http://localhost:5500/news");
    if (res.status === 500) {
      setModalMsg("Session timed out. Please try again.");
      setModalState(true);
      setloading(false);
    } else {
      const news = await res.json();
      setloading(false);
      setNewsData(news);
    }
  };
  const SaveData = async () => {
    setSaveState(true);
    const res = await fetch("http://localhost:5500/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([newsData]),
    });
    if (res.status === 500) {
      setModalMsg("Unsuccessful. Please try again");
      setModalState(true);
      setSaveState(false);
    } else {
      setModalMsg("Aritcle saved!");
      setModalState(true);
      setSaveState(false);
    }
  };
  return (
    <>
      <div style={{ padding: "1.5em", width: "inherit" }}>
        <Button disabled={loading} primary onClick={() => loadNewsArticle()}>
          Scrap Latest News
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
          <NewsWrapper>
            <ImageWrapper>
              <img
                src={newsData.imageURL}
                alt="news_article_image"
                width="500px"
              />
            </ImageWrapper>
            <TextWrapper>
              <h2>{newsData.heading}</h2>
              <p>{newsData.meta}</p>
              <p>{newsData.article}</p>
            </TextWrapper>
            <ButtonWrapper>
              <Button
                disabled={saveState}
                color="green"
                onClick={() => SaveData()}
              >
                Save
              </Button>
            </ButtonWrapper>
          </NewsWrapper>
        </>
      )}
      <Modal
        size="small"
        open={modalState}
        onClose={() => setModalState(false)}
      >
        <Modal.Content>
          <p>{modalMsg}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => {
              setModalState(false);
              setModalMsg("");
            }}
          >
            OK
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default News;
