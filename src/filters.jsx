import React, { useState } from 'react';
import {CHECKBOX_LIST,FILM_CARDS} from './mocs'
import {SORT_TYPES, SORT_YEARS,AMOUNT_OF_CARDS} from './consts'
import { useSelector, useDispatch } from 'react-redux';

export function Filters({currentFilmList,setCurrentFilmList,
   filters, setFilters, filteredFilmList, setfilteredFilmList}){
  const [filtersState, setFiltersState] = useState([...CHECKBOX_LIST])

  const firstFilmNumbers  = useSelector(state=>state.firstFilmNumber); 
  const dispatch = useDispatch();
  const nextPageStore = () =>{
    if (firstFilmNumbers < FILM_CARDS.length - AMOUNT_OF_CARDS){
  dispatch({type: "nextPage"})
    }
 }
 const previousPageStore = () =>{
  if (firstFilmNumbers >= AMOUNT_OF_CARDS) {
  dispatch({type: "previousPage"})
  }
 }

    return (
      <div className = "filters">
        <h1>Фильтры:</h1>
      <button className = "clear_filters" onClick = {()=>{setFiltersState([...CHECKBOX_LIST]);
      const currentFilters = new Set(filters);
      setFilters(currentFilters.clear());
      changeFilteredList(currentFilmList, filters)}}>Cбросить все фильтры</button> 
      <Selector sort = "Сортировать по:" options = {SORT_TYPES}
      currentFilmList={currentFilmList}
      setCurrentFilmList={setCurrentFilmList}
      />
      <Selector sort = "Год релиза:" options = {SORT_YEARS}
       setCurrentFilmList={setCurrentFilmList}/>
      <CheckboxList box = {filtersState} 
      filters = {filters} 
      setFilters = {setFilters}
      currentFilmList={currentFilmList}
      filteredFilmList = {filteredFilmList}
      setfilteredFilmList = {setfilteredFilmList}/>
      <div className = "navigation"> 
      <button onClick={()=>previousPageStore()}>Назад</button>
      <button onClick={()=>{nextPageStore()}}>Вперед</button>
      <p>{firstFilmNumbers/AMOUNT_OF_CARDS+1} из {Math.ceil(filteredFilmList.length/AMOUNT_OF_CARDS)}</p></div>
      
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

function Selector({sort, options,currentFilmList,
  setCurrentFilmList}){
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


  function checkFilters(film, filteres){
    if (filteres.size=== 0) return true
    const filmFiltersLength = film.genre_ids.length;
    const filtersSet = new Set(film.genre_ids);
    for (let item of filteres) filtersSet.add(item);
    return (filmFiltersLength == filtersSet.size)
}

function changeFilteredList(currentFilmList, filters){
  const newFilmList = [];
  for (let film of currentFilmList){
    if (checkFilters(film, filters))
    newFilmList.push(film)
  }
  return newFilmList
}


  function CheckboxList ({box, filters, setFilters, 
    setfilteredFilmList, currentFilmList}){
    const checkboxList = box;
    const list = checkboxList.map((item)=>{
    return <label key = {item.id} id={item.id}>
      <input type="checkbox" onChange={()=>{
        const currentFilters = new Set(filters);
        setfilteredFilmList(changeFilteredList(currentFilmList, filters))
        // console.log(currentFilters);
         if (currentFilters.has(item.id))  {currentFilters.delete(item.id);                             
                                     } else (currentFilters.add(item.id));
          setFilters(currentFilters);
          setfilteredFilmList(changeFilteredList(currentFilmList, filters))
      }}/>
           {` `+item.name}
    </label>
    
    })
    return <form>
      {list}
      </form>
  }