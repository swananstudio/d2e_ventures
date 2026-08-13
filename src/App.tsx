import './App.css'
import { HashRouter, Routes, Route } from 'react-router'
import { Suspense, lazy, useEffect, useRef } from 'react'
import Portfolio from './pages/Portfolio'
import SmoothScroll from './SmoothScroll'
import { Flex, Image } from '@chakra-ui/react'
// import { loadingimage } from './assets/assets'
const Home = lazy(() => import('./pages/home/Home'))
const About_us = lazy(() => import('./pages/About_us'))
const Contact = lazy(() => import('./pages/Contact'))
const Services = lazy(() => import('./pages/Services'))
import { d2e_logo } from './assets/assets'
import gsap from 'gsap'

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

      {/* <Fallback /> */}
    </>
  )
}

export default App

const Fallback = () => {

  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!logoRef.current) return;

    const logo = logoRef.current;

    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
    });

    tl.set(
      logo, {
      scale: 0.88,
      opacity: 1,
      duration: 1,
      ease: "power2.inOut",
    })

    tl.to(logo, {
      scale: 1,
      opacity: 1,
      // rotate: 5,
      duration: 1,
      ease: "power2.inOut",
    });

    return () => {
      tl.kill();
    };
  }, []);
  return (
    <Flex
      w='100%' h='100vh'
      justifyContent={'center'}
      alignItems={'center'}
    // bgColor={'#000000'}
    >
      <Image ref={logoRef} src={d2e_logo} objectFit={'contain'} w='200px' h='200px' />
    </Flex>
  )
}