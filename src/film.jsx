import React from 'react'
import {FILM_CARDS} from './mocs'

export function Films(props){
    const full_list = props.list;
    const film_cards = full_list.map((item, index)=>{
       return <FilmCard key = {item} item = {FILM_CARDS[index]}/>
     }
     ) 
     return film_cards;
   }
   
   function FilmCard(props){
     const imagePath = props.item.poster_path || props.item.backdrop_path;
     const src = `https://image.tmdb.org/t/p/w500/${imagePath}`
   return <div className = "film_card">
   <img alt = "Poster" src = {src}/>
   <div>
     <div>
     <button>✩</button><button>☐\☑\☒</button>
     <p>Рейтинг: {props.item.vote_average}</p>
     <p>{props.item.title}</p> 
     </div>
     <div>   
       Подробнее</div>
   </div>
   </div>
   
   }
   

   
 