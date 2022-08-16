import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import store from "../components/redux/reduxStore";

import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BaseLayout from "../components/layout/base";

const ClientUI = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </Provider>
  );
};

export default ClientUI;
