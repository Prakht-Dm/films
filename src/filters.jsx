import React, { useState } from 'react'
import {CHECKBOX_LIST,FILM_CARDS} from './mocs'
import {SORT_TYPES, SORT_YEARS, SORT_SAVED ,AMOUNT_OF_CARDS} from './consts'

export function Filters({allFilters, setAllFilters}){
  const [filters, setFilters] = useState([...CHECKBOX_LIST]);
  
  const firstItem = allFilters.firstFilmNumber;
  function nextPage(){
    if (firstItem  < FILM_CARDS.length - AMOUNT_OF_CARDS) {
      setAllFilters ({...allFilters, firstFilmNumber: firstItem + AMOUNT_OF_CARDS}); 
    }
  }
  function  previouPage(){
    if (firstItem  >= AMOUNT_OF_CARDS) {
      setAllFilters ({... allFilters, firstFilmNumber: firstItem - AMOUNT_OF_CARDS}); 
    }
  }

    return (
      <div className = "filters">
        <h1>Фильтры:</h1>
      <button className = "clear_filters" onClick={()=>{
      uncheck();
      setAllFilters ({
        firstFilmNumber: 0,
        category: "Популярные по убыванию",
        year: "-",
        genre: new Set(),
        length: FILM_CARDS.length,
      })    
      }}>Cбросить все фильтры</button> 
      <Selector sort = "Сортировать по:" options = {SORT_TYPES}
      allFilters = {allFilters}
      setAllFilters = {setAllFilters}/>
      <Selector sort = "Год релиза:" options = {SORT_YEARS}
      allFilters = {allFilters}
      setAllFilters = {setAllFilters}/>
      {!allFilters.isLoggined || <Selector sort = "" options = {SORT_SAVED}
      allFilters = {allFilters}
      setAllFilters = {setAllFilters}/>}
      <CheckboxList box = {filters}
      allFilters = {allFilters}
      setAllFilters = {setAllFilters} />
      <div className = "navigation"> 
      <button onClick={()=>previouPage()}>Назад</button>
      <button onClick={()=>nextPage()}>Вперед</button>
      <p>{allFilters.firstFilmNumber/AMOUNT_OF_CARDS+1} из {Math.ceil(FILM_CARDS.length/AMOUNT_OF_CARDS)}</p></div>
      
      </div>
    )
  }
function Selector({sort, options, allFilters, setAllFilters}){
    return (
      <>
      <p>{sort}</p>
      <select onChange = {(event)=>{if (options === SORT_TYPES) {setAllFilters({...allFilters, category: event.target.value}); return }
   setAllFilters({...allFilters, year: event.target.value})}}>
        <Selectors options = {options}/>
      </select>
      </>
    )
  }
  
  function Selectors({options}){
    const selectorsList = options;
    const list = selectorsList.map((item)=>{
    return <option key = {item.id}
 >{item.name}</option>
  })
    return list
  }

  function CheckboxList ({box, allFilters, setAllFilters}){
    const checkboxList = box;
    const list = checkboxList.map((item)=>{
    return  <label key = {item.id} id={item.id}
    onChange={()=>changeGenre(item.id, allFilters, setAllFilters)}>
      <input type="checkbox"/>
           {` `+item.name}
    </label>
    })
    return <form>
      {list}
      </form>
  }




  function changeGenre(filter, allFilters, setAllFilters){
    const oldFilers = new Set([...allFilters.genre]);
    if (allFilters.genre.has(filter)){
      oldFilers.delete(filter);
      return setAllFilters({...allFilters, genre: oldFilers})
    }
    return setAllFilters({...allFilters, genre: oldFilers.add(filter)}) 
  }


  function uncheck()
{
 var uncheck=document.getElementsByTagName('input');
 for(var i=0;i<uncheck.length;i++)
 {
  if(uncheck[i].type=='checkbox')
  {
   uncheck[i].checked=false;
  }
 }
}