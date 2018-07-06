import React from "react";
import Aux from "../Aux/Aux.jsx";
//import classes from "./MusicFestivalWebViewLayout.css";
import {Helmet} from "react-helmet";

import WebviewFooterMenu from '../../containers/webview/WebviewFooterMenu.jsx'



const layout = props => {
  return (
    <Aux>
      <Helmet>
        <meta charset="UTF-8" />
        <title>Festbot</title>
        <meta
          name="description"
          content="Festbot is a chatbot for music festivals. "
        />
        <link rel="canonical" href="https://festbot.com/webview" />
      </Helmet>


      {/*HEADER (logo stb)*/}
      <main>{props.children}</main>
      
      <WebviewFooterMenu/>
    </Aux>
  );
};

export default layout;
