import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Sidebar } from './components/Sidebar/Sidebar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Add from './pages/Add/Add'
import Orders from './pages/Orders/Orders'
import List from './pages/List/List'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import User from './pages/User/User'
import Comment from './pages/Comment/Comment'
import Dashboard from './pages/DashBoard/DashBoard'
import Analytics from './pages/Analytics/Analytics'

const App = () => {

  const url = "http://localhost:4001"

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <div className='section-sidebar'>
          <Sidebar />
        </div>
        <div className='main-section'>
          <Routes>
            <Route path="/" element={<Navigate to="/add" replace />} />
            <Route path="/dashboard" element={<Dashboard url={url} />} />
            {/* <Route path="/analytics" element={<Analytics url={url} />} /> */}
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/user" element={<User url={url} />} />
            <Route path="/orders" element={<Orders url={url} />} />
            <Route path="/comment" element={<Comment url={url} />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
