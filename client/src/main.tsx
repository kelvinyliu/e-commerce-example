import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import HeaderBar from './HeaderBar.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CartPage from './CartPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <HeaderBar />
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cart" element={<CartPage />}></Route>
    </Routes>
    </BrowserRouter>
  </StrictMode>
)
