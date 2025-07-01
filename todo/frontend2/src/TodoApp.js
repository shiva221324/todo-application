import React, { useEffect, useState } from 'react'
import axios from 'axios'
const TodoApp = () => {
    const [text,setText]=useState("");
    const [todos,setTodos]=useState([])
    const [isEdit,setIsEdit]=useState('')
  const addtodo=async()=>{
    if(!isEdit){
     const res=await axios.post("http://localhost:8080/api/todos",{text});
     setTodos([...todos,res.data.todo])
     alert("todo added")
    }else{
       await axios.put(`http://localhost:8080/api/todos/${isEdit}`,{text})
       const new_todos=todos.filter((todo)=>todo._id!==isEdit)
       setTodos([...new_todos,{_id:isEdit,text}])
       setIsEdit('')
       setText('')
    }
  }
  const fetchTodos=async()=>{
    const res=await axios.get("http://localhost:8080/api/todos")
    console.log("response ",res)
    setTodos(res.data.todos)
  }
  const deleteTodo=async(id)=>{
     await axios.delete(`http://localhost:8080/api/todos/${id}`)
     setTodos(todos.filter((todo)=>todo._id!==id))
     alert("todo deleted")
  }
  useEffect(()=>{
    fetchTodos();
  },[])
  return (
    <div>
        <input type="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder='Enter task' />
        <button onClick={addtodo}>{isEdit?"Edit":"Add"} todo</button>
        <ul>
            {
              todos && todos.length>0 && todos.map(todo=>(
                    <li key={todo._id}>
                        <span>{todo.text}</span>
                        <button onClick={()=>deleteTodo(todo._id)}>Delete my todo</button>
                        <button onClick={()=>{
                            setIsEdit(todo._id)
                            setText(todo.text)
                        }}>edit my todo</button>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default TodoApp