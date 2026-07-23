import React from 'react'
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import SignIn from './pages/SignIn'
import Orders from './pages/Orders'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />

        <Route path="/signUp" element={<Signup/>}/>
        <Route path="/signIn" element={<SignIn/>}/>
        <Route path="/orders" element={<Orders/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App