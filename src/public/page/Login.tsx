import { useState } from "react";
import SingIn from "../components/SingIn";
import Register from "../components/Register";
import { motion, AnimatePresence } from "framer-motion";

export const Login: React.FC = () => {
  const [LogOrRegister, setLogOrRegister] = useState<boolean>(false);

  const toggleLogOrRegister = () => {
    setLogOrRegister(!LogOrRegister);
  };

  return (
    <div>
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
    </div>
  );
};

export default Login;