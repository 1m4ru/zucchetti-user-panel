import CssBaseline from '@mui/material/CssBaseline'
import './App.css'
import { buildTheme } from './theme'
import { ThemeProvider } from '@mui/material/styles'
import { Toaster } from 'react-hot-toast';
import { useThemeMode } from './hooks/useThemeMode';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';
import Header from './components/Header';
import { Box } from '@mui/material';
import { UserList } from './components/userList/UserList';
import { UserProvider } from './context/UserProvider';

function App() {
  const mode = useThemeMode();
  const theme = buildTheme(mode);


  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider> 
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Toaster position="top-right" />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              minHeight: "100vh",
              width: "100%",
              bgcolor: "background.default",
              color: "text.primary",
              transition: "background-color 0.3s ease",
            }}
          >
            <Header />
            <UserList />
          </Box>
        </ThemeProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App
