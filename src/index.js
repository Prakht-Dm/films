import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createStore} from 'redux'
import { Provider } from 'react-redux';
import {FILM_CARDS} from './mocs'
import {SORT_TYPES, SORT_YEARS,AMOUNT_OF_CARDS} from './consts'


// action =(type: "", payload: "?")
const defaultState = {
  firstFilmNumber: 0,
  filters: new Set(),
  chosenSort: "",
  choseYear: "",
}

const reducer = (state = defaultState, action) =>{
switch(action.type){
  case "nextPage":
    return {...state, firstFilmNumber: state.firstFilmNumber + AMOUNT_OF_CARDS}
  case "previousPage":
    return {...state, firstFilmNumber: state.firstFilmNumber - AMOUNT_OF_CARDS}
  case "firstPage":
    return {...state, firstFilmNumber: 0}



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
