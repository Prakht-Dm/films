import './App.css';

import React, { useState } from 'react';

import {FILM_CARDS} from './mocs'
import {Films} from './film'
import {Filters} from './filters'

function App() {
  const [allFilters, setAllFilters] = useState({
    firstFilmNumber: 0,
    category: "Популярные по убыванию",
    year: "-",
    genre: new Set(),
    length: FILM_CARDS.length,
  });
  return (
 <>
<Header/>
<div className = "main">
<div><Filters 
 allFilters = {allFilters}
 setAllFilters = {setAllFilters}/></div>
<div className = "films"><Films list = {FILM_CARDS} 
allFilters = {allFilters}
setAllFilters = {setAllFilters}/></div>
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
















