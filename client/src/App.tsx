import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ConfiguratorPage } from './pages/ConfiguratorPage'
import { SharedConfigPage } from './pages/SharedConfigPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ConfiguratorPage />} />
      <Route path="/share/:shareId" element={<SharedConfigPage />} />
    </Routes>
  )
}
