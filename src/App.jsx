import { useState } from 'react'
import './App.css'
import {Home, Navbar} from "./components"

function App() {
  return (
    <div className='App' >
        <Navbar/>
        <Home/>
    </div>
  )
}

export default App
