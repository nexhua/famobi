import React from 'react';
import HomePage from './src/pages/HomePage';
import {PaperProvider, MD3DarkTheme} from 'react-native-paper';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={MD3DarkTheme}>
        <HomePage />
      </PaperProvider>
    </QueryClientProvider>
  );
}

export default App;
