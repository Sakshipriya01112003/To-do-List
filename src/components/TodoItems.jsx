import React from 'react'
import tick from '../assets/tick.png'
import not_tick from '../assets/not_tick.png'
import delete_icon from '../assets/delete.png'


const TodoItems = ({text,id,isComplete ,deleteTodo,toggle, startEdit}) => {
  return (
    <div className='flex items-center my-3 gap-2'>
      <div onClick={()=>{toggle(id)}}    className='flex flex-1 items-center cursor-pointer'>

          <img src={isComplete ? tick : not_tick} alt="" className='w-7' />
          <p className={`tex-slate-700 ml-4 text-[17px] decoration-slate-500  ${isComplete ? "line-through" : ""}`}>{text}</p>

      </div>

      <div className='flex gap-2'>
          
     <div className='bg-black rounded full w-[50px] text-white text-center cursor-pointer'>
       <button onClick = {()=>{startEdit(id)}} className='cursor-pointer'>EDIT</button>
     </div>

      <img onClick = {()=>{deleteTodo(id)}} src={delete_icon} alt="" className='w-3.5 cursor-pointer' />
      </div>
      
    </div>
  )
}

export default TodoItems
