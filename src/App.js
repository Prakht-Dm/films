import "./App.css";

import React, { useState } from "react";
import Cookies from 'js-cookie'
import { FILM_CARDS } from "./mocs";
import { Films } from "./film";
import { Filters } from "./filters";

function App() {
  const [allFilters, setAllFilters] = useState({
    firstFilmNumber: 0,
    category: "Популярные по убыванию",
    year: "-",
    genre: new Set(),
    length: FILM_CARDS.length,
    isLoginPageVivsible: (Cookies.get("login") && Cookies.get("password")),
    isLoggined: (Cookies.get("login") && Cookies.get("password")),
  });
  return (
    <>
      <Header allFilters={allFilters} setAllFilters={setAllFilters} />
      <div className="main">
        <div>
          <Filters allFilters={allFilters} setAllFilters={setAllFilters} />
        </div>
        <div className="films">
          <Films
            list={FILM_CARDS}
            allFilters={allFilters}
            setAllFilters={setAllFilters}
          />
        </div>
        <LoginPage allFilters={allFilters} setAllFilters={setAllFilters} />
      </div>
    </>
  );
}

function Header({ allFilters, setAllFilters }) {
  if (allFilters.isLoggined)
    return (
      <header>
        <p>Home</p>
        <button
          onClick={() => {
            setAllFilters({ ...allFilters, isLoggined: false });
            Cookies.remove("login");
            Cookies.remove("password");
          }}
        >
          Logout
        </button>
      </header>
    );
  return (
    <header>
      <p>Home</p>
      <button
        onClick={() => {
          setAllFilters({
            ...allFilters,
            isLoginPageVivsible: !allFilters.isLoginPageVivsible,
          });
        }}
      >
        Login
      </button>
    </header>
  );
}

function LoginPage({ allFilters, setAllFilters }) {
  const [loginInfo, setLoginInfo] = useState({
    login: "" || Cookies.get("login"),
    password: "" || Cookies.get("password"),
  });
  
  if (!allFilters.isLoginPageVivsible) return;
  if (allFilters.isLoggined)
    return (
      <div className="avatar-page">
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHavAqEKhY8MRX7NntKRnkGqFTk42uJT_TuA&usqp=CAU' alt="avatar"></img>
        <p>Hi, this is test of autorization</p>
      </div>
    );
  return (
    <form
      className="login-page"
      onSubmit={() => {
        if (loginInfo.login === "Admin" && loginInfo.password === "admin"){
          setAllFilters({ ...allFilters, isLoggined: true });
          Cookies.set("login", "Admin");
          Cookies.set("password", "admin");
        }
        setLoginInfo({
          login: "",
          password: "",
        });

        }}
    >
      <input
        type="text"
        placeholder="user"
        value={loginInfo.login}
        onChange={(event) => {
          setLoginInfo({
            ...loginInfo,
            login: (loginInfo.login = event.target.value),
          });
          console.log(loginInfo);
        }}
      ></input>
      <input
        type="password"
        placeholder="password"
        value={loginInfo.password}
        onChange={(event) => {
          setLoginInfo({
            ...loginInfo,
            password: (loginInfo.password = event.target.value),
          });
          console.log(loginInfo);
        }}
      ></input>
      <button>login</button>
    </form>
  );
}

export default App;
