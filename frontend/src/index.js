import React from 'react';
import './index.css';
import App from './App';
import ReactDOM from 'react-dom';
import { hydrate, render } from "react-dom";

// const APP = (
//     <App />
// )

// const rootElement = document.getElementById("root");
// if (rootElement.hasChildNodes()) {
//   hydrate(APP, rootElement);
// } else {
//   render(APP, rootElement);
// }
ReactDOM.render(
  <App />,
  document.getElementById("root")
)
