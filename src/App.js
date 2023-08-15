import React from 'react'
import {Routes,Route,BrowserRouter as Router} from "react-router-dom"
import Home from './pages/Home'
import Success from "./pages/Success"
import Checkout from './pages/Checkout'
import Payment from './pages/Payment'
import CheckoutForm from './pages/CheckoutForm'
import TeacherAccount from './pages/TeacherAccount'
import Accountlink from './pages/Accountlink'


const App = () => {
  return (
    <Router>

      <Routes>

        <Route path='/' element={<Home/>}/>
        <Route path='/account' element={<TeacherAccount/>}/>
        <Route path='/accountlink' element={<Accountlink/>}/>
        <Route path='/success' element={<Success/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/payment' element={<Payment/>}/>
        <Route path='/paymentform' element={<CheckoutForm/>}/>
      </Routes>
    </Router>
  )
}

export default App