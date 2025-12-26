import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import Preview from './open/Preview.tsx'
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { ToastContainer } from 'react-toastify';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <ToastContainer />
      <Routes >
          <Route element={<ProtectedRoute/>}>
            <Route path="/dashboard" element={<App/>}/>
          </Route>
          <Route element={<PublicRoute redirectPath="/dashboard" />}> 
          <Route path="/" element={<Preview />} />
          </Route>
          
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)
