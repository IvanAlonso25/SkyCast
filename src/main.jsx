import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { WeatherLocal } from './components/WeatherLocal'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <WeatherLocal />
  </StrictMode>,
)
