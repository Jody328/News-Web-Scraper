import React, { FC } from "react";
import styled from "styled-components";
import { Header } from "./Header";
import { Aside } from "./Aside";

const Container = styled.div`
  display: grid;
  grid-template-areas:
    "nav-menu nav-menu nav-menu"
    "sidebar children aside";
  max-height: 100vh;
  width: 100%;
  grid-template-columns: calc(1fr - 960px) 960px calc(1fr - 960px);
  grid-template-rows: 40px calc(100vh - 40px);
  box-sizing: border-box;
`;

const NavWrapper = styled.div`
  grid-area: nav-menu;
`;

const AsideWrapper = styled.div`
  grid-area: aside;
  min-height: 100%;
  background: #efefef;
  text-align: left;
`;

const SideBarWrapper = styled.div`
  grid-area: sidebar;
  min-height: 100%;
  background: #efefef;
`;

const ChildrenWrapper = styled.div`
  grid-area: children;
  height: 100%;
  width: 100%;
  text-align: center;
`;

const Layout: FC = ({ children }) => (
  <Container>
    <NavWrapper>
      <Header />
    </NavWrapper>
    <AsideWrapper>
      <Aside />
    </AsideWrapper>
    <SideBarWrapper></SideBarWrapper>
    <ChildrenWrapper>{children}</ChildrenWrapper>
  </Container>
);

export default Layout;
