import React from 'react'
import {CHECKBOX_LIST} from './mocs'
import {SORT_TYPES, SORT_YEARS} from './consts'

export function Filters(){
    return (
      <div className = "filters">
        <h1>Фильтры:</h1>
      <button className = "clear_filters">Cбросить все фильтры</button> 
      <Selector sort = "Сортировать по:" options = {SORT_TYPES}/>
      <Selector sort = "Год релиза:" options = {SORT_YEARS}/>
      <CheckboxList box = {CHECKBOX_LIST} />
      <div className = "navigation">   <button className = "clear_filters">Назад</button>
      <button className = "clear_filters">Вперед</button>
      <p>1 из 1455</p></div>
      
      </div>
    )
  }

function Selector(props){
    return (
      <>
      <p>{props.sort}</p>
      <select>
        <Selectors options = {props.options}/>
      </select>
      </>
    )
  }
  
  function Selectors(props){
    const selectorsList = props.options;
    const list = selectorsList.map((item)=>{
    return <option key = {item.id}>{item.name}</option>
    })
    return list
  }

  function CheckboxList (props){
    const checkboxList = props.box;
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