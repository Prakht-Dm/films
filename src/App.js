import './App.css';

import React from 'react'

import {FILM_CARDS} from './mocs'
import {Films} from './film'
import {Filters} from './filters'

function App() {
  return (
 <>
<Header/>
<div className = "main">
<div><Filters/></div>
<div className = "films"><Films list = {FILM_CARDS}/></div>
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
















