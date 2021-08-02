import React from 'react';
import './index.css';
import App from './App';
import { hydrate, render } from "react-dom";

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import allReducers from './reducers';
import { BrowserRouter as Router } from "react-router-dom";

const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const APP = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(APP, rootElement);
} else {
  render(APP, rootElement);
}
