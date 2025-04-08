import React, { useEffect } from 'react';
import AppRouter from './router/AppRouter';
import { Toaster } from 'react-hot-toast';
import { useGlobalStore } from './store/globalStore';

const App: React.FC = () => {
  const { logOut } = useGlobalStore((state) => state)

  useEffect(() => {
    return () => {
      logOut()
    }
  }, [])
  
  return (
      <>
        <Toaster
          toastOptions={{
            style: {
              border: '1px solid #713200',
              padding: '16px',
              color: '#1B1B1B',
              background: '#7bf1a8',
              
            },
          }}
        />
        <AppRouter />
      </>
  )
}

export default App
