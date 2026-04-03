import { Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'
import ProtectedRoute from './routes/protected.route'
import AdminRoute from './routes/admin.route'
// Import pages as needed
// import Landing from '../features/landing/pages/landing.page'
// etc.

function Main() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public routes */}
        {/* <Route path="/" element={<Landing />} /> */}
        {/* Protected routes */}
        {/* <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> */}
        {/* Admin routes */}
        {/* <Route path="/admin" element={<AdminRoute><AdminUsers /></AdminRoute>} /> */}
      </Routes>
    </Suspense>
  )
}

export default Main
