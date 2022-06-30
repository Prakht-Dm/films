import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createStore} from 'redux'
import { Provider } from 'react-redux';
import {FILM_CARDS} from './mocs'


// action =(type: "", payload: "?")
const defaultState = {
  firstFilmNumber: 0,
  currentFilmList: [...FILM_CARDS],
  filteredFilmList: [...FILM_CARDS],
  filters: new Set(),
}



const reducer = (state = defaultState, action) =>{
switch(action.type){



  default:
  return state
}
}
const store = createStore(reducer);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = {store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

