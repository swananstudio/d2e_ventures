import './App.css'
import { HashRouter, Routes, Route } from 'react-router'
import { Suspense, lazy } from 'react'
import Portfolio from './pages/Portfolio'
const Home = lazy(() => import('./pages/home/Home'))
const About_us = lazy(() => import('./pages/About_us'))
const Contact = lazy(() => import('./pages/Contact'))
const Services = lazy(() => import('./pages/Services'))

function App() {

  return (
    <>
      <Suspense>
        <HashRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about-us' element={<About_us />} />
            <Route path='/contact-us' element={<Contact />} />
            <Route path='/services' element={<Services />} />
            <Route path='/portfolio' element={<Portfolio />} />
          </Routes>
        </HashRouter>
      </Suspense> 
    </>
  )
}

export default App

