import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {AMOUNT_OF_CARDS} from './consts'

export function Films({list}){
    const firstFilmNumbers  = useSelector(state=>state.firstFilmNumber);    
    const full_list = list;
    const film_cards = full_list.map((item, index)=>{
        
    if (index >= firstFilmNumbers && index <= firstFilmNumbers+AMOUNT_OF_CARDS-1){
       return <FilmCard key = {item.id} item = {item}/>
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


   
 