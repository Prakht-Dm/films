import React from 'react'
import {FILM_CARDS} from './mocs'
import {AMOUNT_OF_CARDS} from './consts'
import {format} from 'date-fns'


export function Films({list, allFilters, setAllFilters}){
  console.log (allFilters);
    const firstFilmNumbers = allFilters.firstFilmNumber    
    let currentFilmList = [...list];
    switch (allFilters.category){
      case "Популярные по убыванию":
        currentFilmList=[...list.sort(popularityUp)];
      break
      case "Популярные по возрастанию":
        currentFilmList=[...list.sort(popularityDown)];
        break 
      case "Рейтинг по убыванию":
        currentFilmList=[...list.sort(vote_averageDown)];
      break
      case "Рейтинг по возрастанию":
        currentFilmList=[...list.sort(vote_averageUp)];
      break
      default:
      break   
    }
    
    const newCurrentFilmList = currentFilmList.filter(item=>{const dateN = format(new Date(item.release_date), 'yyyy'); 
 return (dateN == allFilters.year || allFilters.year === "-")});
//  setAllFilters({...allFilters, length: 20});
    const film_cards = newCurrentFilmList.map((item, index)=>{
    if (index >= firstFilmNumbers && index <= firstFilmNumbers + AMOUNT_OF_CARDS-1){   
       return <FilmCard key = {index} item = {item}/>
    }
    return false
     }
     ) 
     return film_cards;
   }
   
   function FilmCard({item}){
     const imagePath = item.poster_path || item.backdrop_path;
     const src = `https://image.tmdb.org/t/p/w500/${imagePath}`
   return <div className = "film_card">
   <img alt = "Poster" src = {src}/>
   <div>
     <div>
     <button>✩</button><button>☐\☑\☒</button>
     <p>Рейтинг: {item.vote_average}</p>
     <p>{item.title}</p> 
     </div>
     <div>   
       Подробнее</div>
   </div>
   </div>
   
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
  export function  vote_averageUp(a, b) {
    if (a.vote_average > b.vote_average) return 1;
    if (a.vote_average == b.vote_average) return 0;
    if (a.vote_average < b.vote_average) return -1;
  }
  export function vote_averageDown(a, b) {
    if (a.vote_average > b.vote_average) return -1;
    if (a.vote_average == b.vote_average) return 0;
    if (a.vote_average < b.vote_average) return 1;
  }

  export function checkFilters(film, filteres){
    if (filteres.size === 0) return true
    const filmFiltersLength = film.genre_ids.length;
    const filtersSet = new Set(film.genre_ids);
    for (let item of filteres) filtersSet.add(item);
    return (filmFiltersLength == filtersSet.size)
}

export function changeFilteredList(currentFilmList, filters){
  const newFilmList = [];
  for (let film of currentFilmList){
    if (checkFilters(film, filters)) newFilmList.push(film)
  }
  return newFilmList
}