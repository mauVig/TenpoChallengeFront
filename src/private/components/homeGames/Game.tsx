import React, { useState, memo, useEffect, useRef } from 'react';
import { GoArrowUpRight } from "react-icons/go";
import { motion, useAnimation } from 'framer-motion';

/* Esto es simplemente el componente de cada juego en donde al principio hay 2 funciones para controlar el hover del mouse, y luego en el useEffect se utilizó IntersectionObserver para determinar cuándo cada juego está pasando por la pantalla y así generar un efecto fade in. también algo destacar es que cuando estamos en la vista de escritorio podemos manipular el efecto hover y apretar el botón de ver más que aparece en el medio de la imagen pero cuando estamos en la vista de mobile hago que ese efecto no esté disponible y que sí podamos visualizar un pequeño botón al lado del nombre de ver más. Ambos “ver más” cumplen la misma función de llevarte a la página en la cual se tiene todos los datos de cada juego individual */


export interface GameProps {
  game: {
    thumbnail: string;
    title: string;
    freetogame_profile_url: string;
  };
}

export const Game: React.FC<GameProps> = memo(({ game }) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);
  const { title, thumbnail, freetogame_profile_url } = game as GameProps['game'];
  const articleRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const handleMouseEnter = () => {
    setIsHovering(true);
    setShowButton(false);
    setTimeout(() => {
      setShowButton(true);
    }, 150);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setShowButton(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start({ opacity: 1, y: 0, transition: { duration: 1 } });
            observer.unobserve(entry.target); 
          }
        });
      },
      {
        threshold: 0.1, 
      }
    );

    const currentRef = articleRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [controls]);

  return (
    <motion.article
      ref={articleRef}
      className="relative flex flex-col cursor-pointer group z"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 25 }} 
      animate={controls}
    >
      <div className="order-2 flex justify-between mt-1">
        <h2 className="font-semibold uppercase text-green-200 block w-[70%] text-sm/5  mid:text-base">{title}</h2>
        <a
          href={freetogame_profile_url}
          target="_blank"
          rel="noopener noreferrer"
          className='lg:hidden w-[30%] flex items-center justify-end gap-x-1'>
          <span className='truncate'>Ver mas</span>
          <GoArrowUpRight size={20} />
        </a>
      </div>
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={thumbnail}
          alt={title}
          className="w-full rounded-lg transition-all duration-300 group-hover:scale-105"
          style={{ opacity: isHovering ? 0.7 : 1 }}
        />
        <a
          href={freetogame_profile_url}
          target="_blank"
          rel="noopener noreferrer"
          className={`hidden lg:flex absolute bottom-0 left-0 right-0 h-[90%]  items-end justify-center bg-gradient-to-t from-gray-300 transition-opacity duration-300 ${
            isHovering ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {showButton && (
            <button
              className={`mb-6 px-8 py-2 text-sm bg-myBlack hover:bg-gray-800 active:bg-green-500 text-green-300 rounded-4xl transition-all duration-800 ${
                isHovering ? ' opacity-100 cursor-pointer' : 'opacity-0'
              }`}
            >
              Ver mas
            </button>
          )}
        </a>
      </div>
    </motion.article>
  );
});