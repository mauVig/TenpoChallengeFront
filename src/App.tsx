import React from 'react';
import AppRouter from './router/AppRouter';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  return (
      <>
        <Toaster
          toastOption={{
            style: {
              border: '1px solid #713200',
              padding: '16px',
              color: '#713200',
              back
            },
          }}
        />
        <AppRouter />
      </>
  )
}

export default App
