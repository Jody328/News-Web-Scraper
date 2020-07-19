import React from "react";
import { Card, List, Icon } from "semantic-ui-react";
import styled from "styled-components";

const Container = styled.div`
  margin-left: "0.8em";
  margin-top: "0.8em";
`;

export const Aside = () => {
  return (
    <div>
      <Container>
        <Card style={{ marginLeft: "0.8em", marginTop: "0.2em" }}>
          <Card.Content>
            <Card.Header>Saved Articles</Card.Header>
          </Card.Content>
          <Card.Content>
            <List divided verticalAlign="middle">
              <List.Item>
                <Icon name="favorite" color="yellow" />
                <List.Content>
                  Kids eat weeds as criminals dine out on prohibited billions' -
                  TJSA
                </List.Content>
              </List.Item>
              <List.Item>
                <Icon name="favorite" color="yellow" />
                <List.Content>
                  Cape law enforcement officers injured in clash
                </List.Content>
              </List.Item>
              <List.Item>
                <Icon name="favorite" color="yellow" />
                <List.Content>
                  Durban school accused of racism says 'troublesome boys tested
                  positive for drugs
                </List.Content>
              </List.Item>
              <List.Item>
                <Icon name="favorite" color="yellow" />
                <List.Content>
                  KZN man accused of bombing, murder and terroris
                </List.Content>
              </List.Item>
            </List>
          </Card.Content>
        </Card>
      </Container>
    </div>
  );
};
