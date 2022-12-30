/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/no-head-element */
import React from "react";
import Home from "../components/Home/MainHome/Home";

const Index = () => {
  return (
    <>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Bangers&family=Lobster&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Lobster&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <Home></Home>
    </>
  );
};

export default Index;
