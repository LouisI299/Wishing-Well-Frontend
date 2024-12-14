import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Content = styled.div`
  padding-top: 5em;
  padding-bottom: 5em;
  min-height: calc(100vh - 120px);
`;

const Layout = () => {
  return (
    <div>
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </div>
  );
};

export default Layout;
