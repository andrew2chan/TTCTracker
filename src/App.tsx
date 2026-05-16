import './App.css'
import 'leaflet/dist/leaflet.css';
import { ThemeProvider } from '@mui/material';
import Maps from './components/map/Map';
import { theme } from './theme';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Maps />
      <SpeedInsights />
      <Analytics />
    </ThemeProvider>
  )
}

export default App
