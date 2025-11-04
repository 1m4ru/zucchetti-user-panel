import { createTheme } from "@mui/material/styles";

export const buildTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            background: {
              default: "#fafafa",
              paper: "#fff",
            },
            text: {
              primary: "#111",
              secondary: "#555",
            },
          }
        : {
            background: {
              default: "#121212",
              paper: "#1e1e1e",
            },
            text: {
              primary: "#f1f1f1",
              secondary: "#aaa",
            },
          }),
      primary: {
        main: "#7c3aed",
      },
      secondary: {
        main: "#3b82f6",
      },
      success: {
        main: "#22c55e",
      },
      error: {
        main: "#ef4444",
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiTableContainer: {
        styleOverrides: {
          root: {
            backgroundColor:
              mode === "dark" ? "#1e1e1e" : "#fff",
            borderRadius: 12,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor:
              mode === "dark" ? "#1e1e1e" : "#fff",
            color: mode === "dark" ? "#f5f5f5" : "#111",
          },
        },
      },
    },
  });
