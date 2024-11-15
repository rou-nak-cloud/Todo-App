import React from 'react'
import { useState } from 'react'

const App = () => {
  const [task, setTask] = useState('')
  const [desc, setDesc] = useState('')
  const [todoList, setTodoList] = useState([])

  const submitHandler=(e)=>{
    e.preventDefault();

    if(!task || !desc){
      alert("Task can not be Empty")
      return;
    }

    const isDuplicate = todoList.some((item)=> item.task === task && item.desc === desc);
    if(!isDuplicate){
      const finalTodoList = [...todoList,{task , desc}]
      setTodoList(finalTodoList)
      setTask('')
      setDesc('')
    }
    else{
      alert("Already Task is going on!!")
    }
  }

  let list = todoList.map((value,index) => {
    return(
      <ToList value={value} key={index} indexNumber={index} todoList={todoList} setTodoList={setTodoList}/>
    )
  })
  return (
    <>
    <h1 className='heading'>My Todo List</h1>
    <form onSubmit={submitHandler}>
      <input type="text" placeholder='Enter your Task' value={task}
      onChange={(elem)=>{
        setTask(elem.target.value)
      }} />
      <input type="text" placeholder='Enter your Description' value={desc} 
      onChange={(elem)=>{
        setDesc(elem.target.value)
      }}/>
      <button>Save</button>
    </form>

    <div className='outerBox'>
      <ul>{list}</ul>
    </div>
    </>
  )
}

export default App

function ToList ({value, indexNumber, todoList, setTodoList}) {
  const [status, setStatus] = useState(false)

  let deleteRow=()=>{
    let finalList = todoList.filter((v,i) => i!=indexNumber)
    setTodoList(finalList)
  }

  const checkStatus=()=>{
    setStatus(!status)
  }
  return(
    <li className={(status) ? 'completed' : ''} onClick={checkStatus}>
      <h3>{value.task}</h3>
      <p>{value.desc}</p>
      <div className='cross'>
      <span onClick={deleteRow}>&times;</span>
      </div>
    </li>

  )
}
