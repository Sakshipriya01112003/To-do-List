import { useState } from 'react'
import './App.css'
import Todo from './components/Todo'

function App() {

  return (

   <div className="bg-[url('./assets/background.jpg')] bg-cover bg-center h-screen">
    <div className="grid min-h-screen">
    <Todo/>
   </div>
   </div>
  )
}

export default App
