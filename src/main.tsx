import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from './components/ui/provider';
import preloadImages from './preloadImages.ts';
import {
  services_hero_section,
  about_hero_section,
  contact_hero_section,
  About_Us_Carousel1,
  About_Us_Carousel2,
  About_Us_Carousel3,
  About_Us_Carousel4,
  home
} from './assets/assets.ts'

preloadImages([
  services_hero_section,
  about_hero_section,
  contact_hero_section,
  About_Us_Carousel1,
  About_Us_Carousel2,
  About_Us_Carousel3,
  About_Us_Carousel4,
  home
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>,
)
