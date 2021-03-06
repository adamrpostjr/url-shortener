import React, { useState } from "react";
import Header from "../Header/Header";
import Input from "../Input/Input";
import Output from "../Output/Output";

import config from "../../config-front";

import "./Main.css";

const axios = require("axios");

const hostname = config.app.HOST;

const Main = () => {
  const [longUrl, setLongUrl] = useState("");
  const [responseFromApi, setResponseFromApi] = useState("");
  const [errorFromApi, setErrorFromApi] = useState("");

  const handleInputChange = (event) => {
    setLongUrl(event.target.value);
  };

  const clearOnFocus = (event) => {
    // it is changing value of input, so triggers handleInputChange and sets longUrl to ""
    event.target.value = "";
  };

  const sendLongUrl = (longUrl) => {
    // reset the response and error messages before every new shortening request
    setResponseFromApi(null);
    setErrorFromApi(null);

    // POST long url to API, receive shortened one
    axios
      .post(`${hostname}/shortenme`, { originalUrl: longUrl })
      .then((resp) => {
        setResponseFromApi(resp.data);
      })
      .catch((error) => {
        // all response with codes 4** and 5** comes here
        if (error.response) {
          setErrorFromApi(error.response.data.message);
        } else {
          setErrorFromApi(error.message);
        }
      });
  };

  return (
    <div className="overlay-wrap">
      <div className="overlay">
        <Header />
        <Input
          watchInputChange={handleInputChange}
          triggerPostingUrl={() => sendLongUrl(longUrl)}
          clearOnFocus={clearOnFocus}
        />
        <Output
          shortUrl={responseFromApi}
          error={errorFromApi}
          hostname={hostname}
        />
      </div>
    </div>
  );
};

export default Main;
