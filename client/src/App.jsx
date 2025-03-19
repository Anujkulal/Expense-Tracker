import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import Income from './components/income/Income';
import Expense from './components/expense/Expense';
// import Home from './components/home/Home';
// import Sidebar from './components/sidebar/Sidebar';
import Signin from './components/auth/Signin';
import Dashboard from './components/dashboard/Dashboard';
import Home from './components/home/Home';
import Signup from './components/auth/Signup';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expense" element={<Expense />} />
      </Routes>
    </div>
  )
}

export default App
