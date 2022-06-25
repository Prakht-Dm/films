import './App.css';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {FILM_CARDS} from './mocs'
import {Films} from './film'
import {Filters} from './filters'

function App() {
  const [firstFilmNumber, setFirstFilmNumber] = useState(0);
  const [currentFilmList, setCurrentFilmList] = useState(FILM_CARDS);
  return (
 <>
<Header/>
<div className = "main">
<div><Filters firstFilmNumber = {firstFilmNumber}
 setFirstFilmNumber = {setFirstFilmNumber}
 currentFilmList= {currentFilmList} 
 setCurrentFilmList={setCurrentFilmList}/></div>
<div className = "films"><Films list = {currentFilmList} 
firstFilmNumber = {firstFilmNumber}
/></div>
</div>
 </>
  );
}

function Header(){
  return (
    <header>
      <p>Home</p>
      <button>Login</button>
    </header>
  )
}

export default App;
















