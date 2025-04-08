import { useEffect, useState } from "react";

/* Este es un hook que sirve para poder identificar si el usuario está haciendo scroll hacia abajo o hacia arriba para ir manipulando la barra de navegación */

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [prevScroll, setPrevScroll] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsAtTop(currentScroll === 0);
      
      if (currentScroll <= 0) {
        setScrollDirection('up');
        return;
      }
      
      if (currentScroll > prevScroll) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
    
      setPrevScroll(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScroll]);

  return { scrollDirection, isAtTop };
};

export default useScrollDirection;