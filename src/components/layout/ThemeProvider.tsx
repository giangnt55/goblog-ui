import { useState, type ReactNode } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { lightTheme, darkTheme } from "@/styles/theme";

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const theme = mode === "light" ? lightTheme : darkTheme;

  const toggleMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        <Tooltip title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}>
          <IconButton
            onClick={toggleMode}
            sx={{
              bgcolor: "background.paper",
              boxShadow: 2,
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Tooltip>
      </Box>
      {children}
    </MuiThemeProvider>
  );
}
