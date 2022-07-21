import React from "react";
import { AMOUNT_OF_CARDS } from "./consts";
import { format } from "date-fns";

export function Films({ list, allFilters, setAllFilters }) {
  const firstFilmNumbers = allFilters.firstFilmNumber;
  let currentFilmList = [...list];
  switch (allFilters.category) {
    case "Популярные по убыванию":
      currentFilmList = [...list.sort(popularityUp)];
      break;
    case "Популярные по возрастанию":
      currentFilmList = [...list.sort(popularityDown)];
      break;
    case "Рейтинг по убыванию":
      currentFilmList = [...list.sort(vote_averageDown)];
      break;
    case "Рейтинг по возрастанию":
      currentFilmList = [...list.sort(vote_averageUp)];
      break;
    default:
      break;
  }
  // setAllFilters ({... allFilters ,length: 0});
  const newCurrentFilmList = currentFilmList.filter((item) => {
    const dateN = format(new Date(item.release_date), "yyyy");
    if (!checkFilters(item, allFilters.genre)) return false;
    return dateN == allFilters.year || allFilters.year === "-";
  });

  const filmCardsList = newCurrentFilmList.map((item, index) => {
    if (
      index >= firstFilmNumbers &&
      index <= firstFilmNumbers + AMOUNT_OF_CARDS - 1
    ) {
      return <FilmCard
      key = {index}
      item = {item}
      isLoggined = {allFilters.isLoggined} />;
    }
    return false;
  });

  console.log(allFilters);
  console.log(newCurrentFilmList);
  return filmCardsList;
}

function FilmCard({ item, isLoggined }) {
  const imagePath = item.poster_path || item.backdrop_path;
  const src = `https://image.tmdb.org/t/p/w500/${imagePath}`;
  return (
    <div className="film_card">
      <img alt="Poster" src={src} />
      <div>
        <div>
          <button onClick={()=>{if (isLoggined)
            changeFavoritesOrWatchLaterList("favorites", item.id)
           else
          alert("Необходимо зарегестрироваться")
        }
        }>{(isFilmInStorage("favorites", item.id, "★", "☆", isLoggined))}</button>
          <button onClick={()=>{if (isLoggined)
            changeFavoritesOrWatchLaterList("watchLater", item.id)
           else
          alert("Необходимо зарегестрироваться")
        }
      }>{(isFilmInStorage("watchLater", item.id, "⚑", "☭", isLoggined ))}</button>
          <p>Рейтинг: {item.vote_average}</p>
          <p>{item.title}</p>
        </div>
        <div>Подробнее</div>
      </div>
    </div>
  );
}

export function changeFavoritesOrWatchLaterList(type, item){
    const list = localStorage[`${type}`];
    let listSet = new Set([item])
    if (list){
    listSet = new Set(list.split(" "))
    if (listSet.has(`${item}`)) listSet.delete(`${item}`)
  else listSet.add(`${item}`)
  
    }
    console.log((listSet));
  localStorage[`${type}`] = Array.from(listSet).join(' ')
}

export function isFilmInStorage(type, item, sibolTrue, simbolFalse, isLoggined ){
  const list = localStorage[`${type}`];
  if (list){
  const listSet = new Set(list.split(" "))
  return (listSet.has(`${item}`) && isLoggined) ? sibolTrue : simbolFalse;
}
return simbolFalse;
}


export function popularityUp(a, b) {
  if (a.popularity > b.popularity) return -1;
  if (a.popularity == b.popularity) return 0;
  if (a.popularity < b.popularity) return 1;
}
export function popularityDown(a, b) {
  if (a.popularity > b.popularity) return 1;
  if (a.popularity == b.popularity) return 0;
  if (a.popularity < b.popularity) return -1;
}
export function vote_averageUp(a, b) {
  if (a.vote_average > b.vote_average) return 1;
  if (a.vote_average == b.vote_average) return 0;
  if (a.vote_average < b.vote_average) return -1;
}
export function vote_averageDown(a, b) {
  if (a.vote_average > b.vote_average) return -1;
  if (a.vote_average == b.vote_average) return 0;
  if (a.vote_average < b.vote_average) return 1;
}

export function checkFilters(film, filteres) {
  if (filteres.size === 0) return true;
  const filmFiltersLength = film.genre_ids.length;
  const filtersSet = new Set(film.genre_ids);
  for (let item of filteres) filtersSet.add(item);
  return filmFiltersLength == filtersSet.size;
}

export function changeFilteredList(currentFilmList, filters) {
  const newFilmList = [];
  for (let film of currentFilmList) {
    if (checkFilters(film, filters)) newFilmList.push(film);
  }
  return newFilmList;
}
