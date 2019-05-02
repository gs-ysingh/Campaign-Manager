import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import App from "./App.jsx";
import reducer from './store/reducer';

const wrapper = document.getElementsByClassName("container");
const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), wrapper[0]);