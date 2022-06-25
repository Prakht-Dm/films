import React from 'react'
import {CHECKBOX_LIST,FILM_CARDS} from './mocs'
import {SORT_TYPES, SORT_YEARS,AMOUNT_OF_CARDS} from './consts'

export function Filters({firstFilmNumber, setFirstFilmNumber,currentFilmList,setCurrentFilmList}){
  function nextPage(){
    if (firstFilmNumber < FILM_CARDS.length - AMOUNT_OF_CARDS) {
      setFirstFilmNumber (firstFilmNumber+AMOUNT_OF_CARDS); 
    }
return
  }
  function  previouPage(){
    if (firstFilmNumber >= AMOUNT_OF_CARDS) {
      setFirstFilmNumber (firstFilmNumber-AMOUNT_OF_CARDS); 
    }
return
  }






    return (
      <div className = "filters">
        <h1>Фильтры:</h1>
      <button className = "clear_filters">Cбросить все фильтры</button> 
      <Selector sort = "Сортировать по:" options = {SORT_TYPES}
      currentFilmList={currentFilmList}
      setCurrentFilmList={setCurrentFilmList}
      />
      <Selector sort = "Год релиза:" options = {SORT_YEARS}
       setCurrentFilmList={setCurrentFilmList}/>
      <CheckboxList box = {CHECKBOX_LIST} />
      <div className = "navigation"> 
      <button onClick={()=>previouPage()}>Назад</button>
      <button onClick={()=>nextPage()}>Вперед</button>
      <p>{firstFilmNumber/AMOUNT_OF_CARDS+1} из {Math.ceil(FILM_CARDS.length/AMOUNT_OF_CARDS)}</p></div>
      
      </div>
    )
  }

  function popularityUp(a, b) {
    if (a.popularity > b.popularity) return -1;
    if (a.popularity == b.popularity) return 0;
    if (a.popularity < b.popularity) return 1;
  }
  function popularityDown(a, b) {
    if (a.popularity > b.popularity) return 1;
    if (a.popularity == b.popularity) return 0;
    if (a.popularity < b.popularity) return -1;
  }
  function  vote_averageUp(a, b) {
    if (a.vote_average > b.vote_average) return 1;
    if (a.vote_average == b.vote_average) return 0;
    if (a.vote_average < b.vote_average) return -1;
  }
  function vote_averageDown(a, b) {
    if (a.vote_average > b.vote_average) return -1;
    if (a.vote_average == b.vote_average) return 0;
    if (a.vote_average < b.vote_average) return 1;
  }

function Selector({sort, options,currentFilmList,setCurrentFilmList}){
  function filters(value){
    switch (value){
      case "Популярные по убыванию":
      setCurrentFilmList([...currentFilmList.sort(popularityUp)]);
      break
      case "Популярные по возрастанию":
      setCurrentFilmList([...currentFilmList.sort(popularityDown)]);
        break 
      case "Рейтинг по убыванию":
        setCurrentFilmList([...currentFilmList.sort(vote_averageDown)]);
      break
      case "Рейтинг по возрастанию":
        setCurrentFilmList([...currentFilmList.sort(vote_averageUp)]);
      break
      default:
      alert('что-то пошло не так');
      break   
    }
    }


    return (
      <>
      <p>{sort}</p>
      <select onChange={(event)=>filters(event.target.value)}>
        <Selectors options = {options}/>
      </select>
      </>
    )
  }
  



  function Selectors({options}){
    const selectorsList = options;
    const list = selectorsList.map((item)=>{
    return <option key = {item.id} >{item.name}</option>
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