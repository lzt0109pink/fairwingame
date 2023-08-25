import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { Provider } from 'reto'
import AppStorage from './storages/appstorage'
import { TransactionsProvider } from "./context/TransactionContext";
import "./index.css";

ReactDOM.render(

  <TransactionsProvider>
    <Provider of={AppStorage} memo>
    <App />
    </Provider>
  </TransactionsProvider>,
  document.getElementById("root"),
);
