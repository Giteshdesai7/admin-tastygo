import React from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import Sidebar from './components/sidebar/sidebar.jsx'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add/Add.jsx'
import Orders from './pages/Orders/Orders.jsx'
import List from './pages/List/List.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Inventory from './pages/Inventory/Inventory';
import Sales from './pages/Sales/Sales.jsx'

const App = ()=> {

  const url ="http://localhost:4000"

  return(
    <div>
      <ToastContainer/>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url}/>} />
          <Route path="/orders" element={<Orders url={url}/>} />
          <Route path="/inventory" element={<Inventory url={url}/>}/>
          <Route path="/sales" element={<Sales url={url}/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App