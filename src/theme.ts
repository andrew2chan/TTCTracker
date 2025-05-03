import { createTheme } from "@mui/material/styles";

declare module '@mui/material/styles' {
    interface Palette {
      darkGray: Palette['primary'];
    }
  
    interface PaletteOptions {
      darkGray?: PaletteOptions['primary'];
    }
  }

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
      darkGray: true;
    }
  }

  export const theme = createTheme({
    palette: {
        darkGray: {
            main: "#474747",
            contrastText: "#ffffff"
        }
    }
  });