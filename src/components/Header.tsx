import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useThemeMode } from "../hooks/useThemeMode";
import { useAppDispatch } from "../store";
import { setMode } from "../store/uiSlice";

export default function Header() {
  const mode = useThemeMode();
  const dispatch = useAppDispatch();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backdropFilter: "blur(12px)",
        backgroundColor:
          mode === "dark" ? "rgba(18,18,18,0.9)" : "rgba(255,255,255,0.8)",
        color: mode === "dark" ? "#fff" : "#111",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            component="img"
            src="/zucchetti.png"
            alt="Zucchetti logo"
            sx={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              objectFit: "cover",
              boxShadow: "0 0 8px rgba(124,58,237,0.4)",
            }}
          />

          <Typography
            variant="h5"
            fontWeight={700}
            sx={{
              letterSpacing: 0.5,
              background:
                "linear-gradient(90deg, #3b82f6, #7c3aed, #3b82f6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
           uZer Admin Panel
          </Typography>
        </Box>

        <IconButton
          onClick={() => dispatch(setMode(mode === "light" ? "dark" : "light"))}
          aria-label="toggle-theme"
        >
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
