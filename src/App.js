import './App.css';

import React, { useState } from 'react';

import {FILM_CARDS} from './mocs'
import {Films} from './film'
import {Filters} from './filters'

function App() {
  const [firstFilmNumber, setFirstFilmNumber] = useState(0);
  return (
 <>
<Header/>
<div className = "main">
<div><Filters firstFilmNumber = {firstFilmNumber}
 setFirstFilmNumber = {setFirstFilmNumber}/></div>
<div className = "films"><Films list = {FILM_CARDS} 
firstFilmNumber = {firstFilmNumber}/></div>
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
















