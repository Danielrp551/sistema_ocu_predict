import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Orbitron, sans-serif",
    h5: {
      fontWeight: 700,
    },
  },
  palette: {
    primary: {
      main: "#002C77", // Azul oscuro Marsh McLennan
      contrastText: "#fff", // Texto en blanco
    },
    secondary: {
      main: "#00A8C7", // Azul celeste Marsh McLennan
      contrastText: "#fff", // Texto en blanco
    },
    background: {
      default: "#F5F5F5", // Fondo general en gris claro
      paper: "#ffffff", // Fondo de tarjetas o paneles en blanco
    },
    text: {
      primary: "#002C77", // Texto principal azul oscuro
      secondary: "#00A8C7", // Texto resaltado en azul celeste
    },
  },

  // Overrides globales de componentes
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "#002C77", // Texto dentro del input en azul oscuro
          "& fieldset": {
            borderColor: "rgba(0, 44, 119, 0.5)", // Azul oscuro translúcido
          },
          "&:hover fieldset": {
            borderColor: "#00A8C7", // Azul celeste al pasar el mouse
          },
          "&.Mui-focused fieldset": {
            borderColor: "#00A8C7", // Azul celeste cuando está en foco
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#002C77", // Color del label en azul oscuro
          "&.Mui-focused": {
            color: "#00A8C7", // Azul celeste cuando el input está enfocado
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: "#00A8C7",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "rgba(0, 44, 119, 0.5)",
            },
            "&:hover fieldset": {
              borderColor: "#00A8C7",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#00A8C7",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: "bold",
          textTransform: "none",
          borderRadius: "8px",
          padding: "10px 20px",
        },
        containedPrimary: {
          backgroundColor: "#002C77",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#001F5B",
          },
        },
        containedSecondary: {
          backgroundColor: "#00A8C7",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#008FB2",
          },
        },
      },
    },
  },
});

export default theme;
