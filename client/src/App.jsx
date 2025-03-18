import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import Income from './components/income/Income';
import Expense from './components/expense/Expense';
import Home from './components/home/Home';
import Sidebar from './components/sidebar/Sidebar';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expense" element={<Expense />} />
      </Routes>
    </div>
  )
}

export default App
