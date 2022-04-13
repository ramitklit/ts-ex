import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import './styles/index.scss'
import DefaultLayout from './layout/DefaultLayout'
import Home from './pages/Home'
import NotFound from './pages/error/NotFound'
import Me from './pages/users/Me'

// react v18 recommended using it.
const rootDOM = createRoot(document.getElementById('root'))

rootDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                {/* default layout */}
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/users/@me" element={<Me />} />
                </Route>
                {/* other layout like docs or admin if you wish */}
                {/* error page notfound */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)

// web vitals is also important read this for moret info:
// https://github.com/GoogleChrome/web-vitals#readme
reportWebVitals()

