import React from "react";
import Aux from "../Aux/Aux.jsx";
import {Helmet} from "react-helmet";
//import classes from "./Layout.css";

import NavBar from '../../ui/www/NavBar.jsx'

const layout = props => {

 

  return (
    <Aux>
      <Helmet>
        <meta charset="UTF-8" />
        <title>Festbot</title>
        <meta
          name="description"
          content="Festbot is a chatbot for greater festival experience. "
        />
        <link rel="canonical" href="https://festbot.com/" />
      </Helmet>
      <NavBar/>
      <main >{props.children}</main>
      Footer


    </Aux>
  );
};

export default layout;
