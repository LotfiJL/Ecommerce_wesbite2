import React from "react";
import Header from "../Header/Header";
import MenuHeader from "../MenuHeader/MenuH";

const Layout = (props) => {
  return (
    <>
      <Header />
      <MenuHeader />
      {props.children}
    </>
  );
};

export default Layout;
