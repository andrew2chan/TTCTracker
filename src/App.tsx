import './App.css'
import 'leaflet/dist/leaflet.css';
import { ThemeProvider } from '@mui/material';
import Maps from './components/map/Map';
import { theme } from './theme';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Maps />
    </ThemeProvider>
  )
}

export default App
