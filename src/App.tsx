import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import StoreProvider from './redux/StoreProvider';

const App: React.FC = () => {
  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </StoreProvider>
  );
};

export default App;