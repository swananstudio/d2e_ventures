import './App.css'
import { HashRouter, Routes, Route } from 'react-router'
import { Suspense, lazy } from 'react'
import Portfolio from './pages/Portfolio'
import SmoothScroll from './SmoothScroll'
import { Flex, Image } from '@chakra-ui/react'
import { loadingimage } from './assets/assets'
const Home = lazy(() => import('./pages/home/Home'))
const About_us = lazy(() => import('./pages/About_us'))
const Contact = lazy(() => import('./pages/Contact'))
const Services = lazy(() => import('./pages/Services'))

function App() {

  return (
    <>
      <Suspense fallback={<Fallback />}>
        <SmoothScroll>
          <HashRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about-us' element={<About_us />} />
              <Route path='/contact-us' element={<Contact />} />
              <Route path='/services' element={<Services />} />
              <Route path='/portfolio' element={<Portfolio />} />
            </Routes>
          </HashRouter>
        </SmoothScroll>
      </Suspense>
    </>
  )
}

export default App

const Fallback = () => {
  return (
    <Flex
      w='100%' h='100vh'
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Image src={loadingimage} w='250px' h='250px' />
    </Flex>
  )
}