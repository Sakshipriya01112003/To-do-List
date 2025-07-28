import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'

const Todo = () => {
  const [todoList , setTodoList] = useState(localStorage.getItem("todo")?JSON.parse(localStorage.getItem("todo")): [] );
 
  const [isEditing , setIsEditing] = useState(false);

  const [editIndex, setEditIndex] = useState(null);
  const inputRef = useRef();

  const add = () =>{
      const inputText = inputRef.current.value.trim();
      if(inputText === "")
      {
         alert("The input box is Empty");
        return null;
      }

      const newTodo = {
          id:Date.now(),
          text:inputText,
          isComplete : false,
      }

      //updating List
      setTodoList((prev) => [...prev,newTodo])

      // clear value of input box
      inputRef.current.value = ""

  }

  const deleteTodo = (id) => {
    setTodoList((prevTodo) =>
      {
         return prevTodo.filter((todo) => todo.id !== id)
      })
  }

 const startEdit = (id) => {
   setIsEditing(true);
   setEditIndex(id);
   const selectedTodo = todoList.find((todo) => todo.id == id);
   if(selectedTodo)
   {
    inputRef.current.value = selectedTodo.text;
   }
 }

 const saveEditTodo = () => {
      if(inputRef.current.value.trim() && editIndex !== null)
      {
        // we have something to edit
        let updatedTodo = todoList.map((todo) => {
          if(todo.id === editIndex)
          {
            // text update
            return {...todo,text:inputRef.current.value}
          }
          return todo;
        });

        // updation of list
        setTodoList(updatedTodo);

        // setting for next addition
        setIsEditing(false);
        setEditIndex(null);
        inputRef.current.value = "";
      }

      
 }

  const toggle = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if(todo.id === id)
        {
          return {...todo,isComplete: !todo.isComplete}
        }
          return todo;
      })
    })
  }

  useEffect(() => {
    localStorage.setItem("Todos",JSON.stringify(todoList));
  },[todoList])

  return (
    <div className='bg-white rounded-xl place-self-center  w-11/12 max-w-md flex flex-col p-7 min-h-[550px]'>

      {/* Title */}
     <div className='flex items-center mt-7 gap-2'>
       <img className="w-8" src={todo_icon} alt="" />
       <h1 className='font-bold text-3xl' >To-Do List</h1>
     </div>
{/* 
     input-box */}

     <div className="flex items-center my-7 bg-gray-200 rounded-full">
         <input  ref={inputRef} className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600" type="text" placeholder="Add your task" />

         <div>
          {isEditing ? <button onClick={saveEditTodo} className='border-none rounded-full bg-orange-600 w-30 h-14 text-white text-lg font-medium cursor-pointer'>Save</button> :
          <button onClick={add}className='border-none rounded-full bg-orange-600 w-30 h-14 text-white text-lg font-medium cursor-pointer'>ADD+</button>}
         </div>

         {/* <button onClick={add}className='border-none rounded-full bg-orange-600 w-30 h-14 text-white text-lg font-medium cursor-pointer'>ADD +</button> */}

     </div>
{/* 
     to-list */}

     <div>
      {todoList.map((item,index) => {
        return <TodoItems key={index} text={item.text}  id={item.id} isComplete ={item.isComplete} deleteTodo = {deleteTodo} toggle={toggle} startEdit = {startEdit} />
      })}
     </div>
    </div>
    
  )
}

export default Todo
