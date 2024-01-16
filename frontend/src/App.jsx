import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login.jsx'
import SignUp from './signup.jsx';
import ToDoList from './ToDoList'
import ToDo from './components/ToDo'
import { getAllToDO,addToDO,updateToDo,deleteToDo,uploadImage } from './utils/HandleApi'

function App() {
  return (
    <div>
      
      <Router>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signUp' element={<SignUp/>} />
          <Route path='/ToDoList' element={<ToDoList/>} />
        </Routes>
      </Router>
    </div>

  )
}

export default App