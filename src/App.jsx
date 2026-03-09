import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/home"
import Login from './pages/Login'
import Singup from './pages/Singup'
import ForgotPassword from './pages/Forgetpassword'
import Dasbord from './pages/Dasbord'
import NotFind from './pages/NotFind'
import PerviteDasbord from './coustomhook/PerviteDasbord'
import Userslice from './RTK/HOOK/User.slice'
const App = () => {
  Userslice()
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/singup" element={<Singup/>} />
      <Route path='/forgetpassword' element={<ForgotPassword/>} />
      <Route path="/dasbord" element={<PerviteDasbord children={<Dasbord/>} />} />
      <Route path='*' element={<NotFind/>} />
    </Routes>
  )
}

export default App