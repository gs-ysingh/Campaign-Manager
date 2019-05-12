import express from 'express';
import React from 'react';
import path from 'path';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import App from "../App";
import reducer from '../client/store/reducer';

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// This is fired every time the server side receives a request
app.use(handleRender);

// We are going to fill these out in the sections to follow
function handleRender(req, res) {
  const store = createStore(reducer, applyMiddleware(thunk));
  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter>
        <App />
      </StaticRouter>
    </Provider>
  );

  const preloadedState = store.getState();
  res.send(renderFullPage(html, preloadedState));
}

function renderFullPage(html, preloadedState) {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta id="viewport" name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
        <title>How to set up React, Webpack, and Babel</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #797979;
            margin: 0;
            padding: 0;
          }
        </style>
    </head>
    <body>
      <div id="container">
        ${html}
      </div>
      <script>
        // WARNING: See the following for security issues around embedding JSON in HTML:
        // http://redux.js.org/recipes/ServerRendering.html#security-considerations
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
          /</g,
          '\\u003c'
        )}
      </script>
      <script src="client.bundle.js"></script>
    </body>
  </html>`
}

app.listen(PORT, err => {
  if(err) {
    console.log('Something bad happened');
  }
  console.log("Listening on port " + PORT);
});