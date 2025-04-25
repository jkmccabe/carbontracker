import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Products from './Products'
import Offsets from './Offsets'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/offsets" element={<Offsets />} />
    </Routes>
  )
}