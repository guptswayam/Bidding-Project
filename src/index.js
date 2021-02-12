import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, compose, applyMiddleware} from "redux"
import {Provider} from "react-redux"
import reduxThunk from "redux-thunk"
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import authReducer from "./store/reducers/auth"

let composeEnhancers = process.env.NODE_ENV==="development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : undefined;

composeEnhancers = composeEnhancers || compose


const reducers = combineReducers({
  authReducer
})

const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)))


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
