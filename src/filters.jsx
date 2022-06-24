import React from 'react'
import {CHECKBOX_LIST,FILM_CARDS} from './mocs'
import {SORT_TYPES, SORT_YEARS,AMOUNT_OF_CARDS} from './consts'



export function Filters({firstFilmNumber, setFirstFilmNumber}){
  function nextPage(){
    if (firstFilmNumber < FILM_CARDS.length - AMOUNT_OF_CARDS) {
      setFirstFilmNumber (firstFilmNumber+AMOUNT_OF_CARDS); 
    }
return
  }
  function  previouPage(){
    if (firstFilmNumber >= AMOUNT_OF_CARDS) {
      setFirstFilmNumber (firstFilmNumber-6); 
    }
return
  }






    return (
      <div className = "filters">
        <h1>Фильтры:</h1>
      <button className = "clear_filters">Cбросить все фильтры</button> 
      <Selector sort = "Сортировать по:" options = {SORT_TYPES}/>
      <Selector sort = "Год релиза:" options = {SORT_YEARS}/>
      <CheckboxList box = {CHECKBOX_LIST} />
      <div className = "navigation"> 
      <button onClick={()=>previouPage()}>Назад</button>
      <button onClick={()=>nextPage()}>Вперед</button>
      <p>{firstFilmNumber/AMOUNT_OF_CARDS+1} из {Math.ceil(FILM_CARDS.length/AMOUNT_OF_CARDS)}</p></div>
      
      </div>
    )
  }







function Selector({sort, options}){
    return (
      <>
      <p>{sort}</p>
      <select>
        <Selectors options = {options}/>
      </select>
      </>
    )
  }
  
  function Selectors({options}){
    const selectorsList = options;
    const list = selectorsList.map((item)=>{
    return <option key = {item.id}>{item.name}</option>
    })
    return list
  }

  function CheckboxList ({box}){
    const checkboxList = box;
    const list = checkboxList.map((item)=>{
    return <>
    <label key = {item.id} id={item.id}>
      <input type="checkbox"/>
           {` `+item.name}
    </label>
    </>
    })
    return <form>
      {list}
      </form>
  }