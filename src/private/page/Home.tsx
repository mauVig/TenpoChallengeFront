import { useEffect, useRef } from 'react';
import { GamesContainers } from '../components/homeGames/GamesContainers';
import { useGlobalStore } from '../../store/globalStore';
import { useNavigate } from "react-router";
import NavBar from '../components/NavBar';
import toast from 'react-hot-toast';
import { motion, useAnimation } from 'framer-motion';

/* En este componente podemos encontrar que primero hay una verificación si estás logeado o no, haciendo una verificación en el global store y si no es así te traslada a la página de login. Luego están las configuraciones para el efecto fade in para el título y el párrafo. Y por último podemos encontrar el componente que contiene a los datos de los juegos  */

export const Home: React.FC = () => {
  const { isLogin } = useGlobalStore(state => state);
  const navigate = useNavigate();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const titleControls = useAnimation();
  const paragraphControls = useAnimation();

  useEffect(() => {
    if (!isLogin) {
      toast.error('Debes iniciar sesion para acceder a esta pagina', {
        position: 'top-center',
        duration: 2000,
        style: {
          background: '#1B1B1B',
          color: '#fff',
        },
      });
      navigate('/');
    }
  }, [isLogin, navigate]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            titleControls.start({ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, [titleControls]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            paragraphControls.start({ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    if (paragraphRef.current) {
      observer.observe(paragraphRef.current);
    }

    return () => {
      if (paragraphRef.current) {
        observer.unobserve(paragraphRef.current);
      }
    };
  }, [paragraphControls]);

  return (
    <div className='w-full min-h-screen bg-myBlack text-gray-300'>
      <div className='bg-[url("/back-pc.webp")] bg-cover bg-no-repeat bg-center h-[600px] mid:h-[700px] md:h-[800px] lg:h-[830px] after:absolute after:inset-0 after:bg-gradient-to-t after:from-myBlack'>
        <NavBar />
        <div className='max-w-screen-2xl mx-auto px-4 relative z-30'>
          <main className='pt-20 lg:py-20'>
            <motion.h1
              ref={titleRef}
              className='text-4xl w-[260px] mid:text-5xl/13 mid:w-[400px] md:text-6xl/18 lg:text-8xl/24 lg:w-[700px] uppercase title-font mt-8 block'
              initial={{ opacity: 0, y: 30 }}
              animate={titleControls}
            >
              <span className="text-green-300 title-font">Juegos</span> para todas las plataformas
            </motion.h1>
            <motion.p
              ref={paragraphRef}
              className='text-sm/5 w-[260px] mid:text-xl mid:w-[350px] md:text-2xl md:w-[430px] lg:text-3xl lg:w-[600px] block mt-2 font-semibold '
              initial={{ opacity: 0, y: 30 }}
              animate={paragraphControls}
            >
              Encontrá lo último en juegos de Shooter, Estrategia, Deportes, Mundo Abierto y mucho más.
            </motion.p>
          </main>
        </div>
      </div>
      <div className='max-w-screen-2xl mx-auto px-4 -mt-54'>
        <GamesContainers />
      </div>
    </div>
  );
};