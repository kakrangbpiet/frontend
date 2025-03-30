import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import StoreProvider from './redux/StoreProvider';
import "./App.css"
const App: React.FC = () => {
  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </StoreProvider>
  );
};

export default App;