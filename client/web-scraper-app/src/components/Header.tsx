import React from "react";
import { Menu } from "semantic-ui-react";
import styled from "styled-components";

const TextWrapper = styled.p`
  @media (max-width: 768px) {
    font-size: 0.85em;
  }
`;

export const Header = () => {
  return (
    <div className="header">
      <Menu attached="top">
        <Menu.Item header>
          <TextWrapper>Bright Group</TextWrapper>
        </Menu.Item>
      </Menu>
    </div>
  );
};
