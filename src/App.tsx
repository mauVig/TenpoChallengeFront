import React from 'react';
import AppRouter from './router/AppRouter';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  return (
      <>
        <Toaster
          toastOptions={{
            style: {
              border: '1px solid #713200',
              padding: '16px',
              color: '#1B1B1B',
              background: '#6AFF99',
              
            },
          }}
        />
        <AppRouter />
      </>
  )
}

export default App
