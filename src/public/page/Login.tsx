import { useEffect, useState } from "react";
import SingIn from "../components/SingIn";
import Register from "../components/Register";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export const Login: React.FC = () => {
  const [LogOrRegister, setLogOrRegister] = useState<boolean>(false);
  const { err } = useParams<{ err: string }>();
  const toggleLogOrRegister = () => {
    setLogOrRegister(!LogOrRegister);
  };

  useEffect(() => {
    if ( err ){
      toast.error('Debes iniciar sesion para acceder a esta pagina', {
        position: 'top-center',
        duration: 2000,
        style: {
          background: '#1B1B1B',
          color: '#fff',
        },
      });
    }
  }, []);




 /* Acá utilicé primero la etiqueta aside para que no se indexe en Google, aunque la librería react no a indexar en Google pero sí hay herramientas de SEO  para poder lograrlo.  
  Luego también utilice la librería frame motion para generar un efecto entre el componente SingIn y Register.  
   La función toggleLogOrRegister sirve como collback para ir mostrando de a uno los 2 componentes. */
  
  return (
    <aside className="w-full h-screen flex items-center justify-center bg-myBlack text-gray-300">
      <div className="relative">
        <AnimatePresence mode="wait">
          {LogOrRegister ? (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 90 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
            >
              <Register toggle={toggleLogOrRegister}/>
            </motion.div>
          ) : (
            <motion.div
              key="signin"
              initial={{ opacity: 0, x: -90 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.6 }}
            >
              <SingIn  toggle={toggleLogOrRegister}/>
            </motion.div>
          )}
        </AnimatePresence>
      
      </div>
    </aside>
  );
};

export default Login;