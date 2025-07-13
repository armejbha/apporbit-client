import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthProvider from './Context/AuthProvider'
import { RouterProvider } from 'react-router'
import { router } from './Routes/Router'
import { Toaster } from 'react-hot-toast'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
      <Toaster position='top-right' reverseOrder={false}></Toaster>
    </AuthProvider>
  </StrictMode>,
)
