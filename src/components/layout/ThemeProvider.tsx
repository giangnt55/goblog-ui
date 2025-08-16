import { useState, type ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { lightTheme, darkTheme } from '@/styles/theme';

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const theme = mode === 'light' ? lightTheme : darkTheme;

  const toggleMode = () => setMode(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}>
        <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
          <IconButton onClick={toggleMode} color="inherit">
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Tooltip>
      </Box>
      {children}
    </MuiThemeProvider>
  );
}
