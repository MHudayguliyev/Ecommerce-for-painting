import React from 'react'
import ReactDOM from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react';
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";
import App from './App.tsx'

//redux 
import {store, persistor} from '@redux/store';
import { Provider } from 'react-redux';
//styles
import './styles/global.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
        </PersistGate>
    </Provider>
  </React.StrictMode>,
)
