import React, { useEffect } from 'react';
import AppRouter from './router/AppRouter';
import { Toaster } from 'react-hot-toast';
import { useGlobalStore } from './store/globalStore';

const App: React.FC = () => {
  const { logOut } = useGlobalStore((state) => state)

  // Acá lo que estoy resolviendo es que cuando se desmonte toda la aplicación se ejecute primero la función logOut() y reinicie las variables isLogin en false y userEmail en un string vacío 
  useEffect(() => {
    return () => {
      logOut()
    }
  }, [])
  
  return (
      <>
      {/*  Esta es la configuración principal del toast para generarle los estilos customizados y también aprovecho el archivo app.tsx para poner esta configuración en lo más alto de la aplicación. Sirve para mostrar mensajes en la parte superior de la pantalla  */}
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
