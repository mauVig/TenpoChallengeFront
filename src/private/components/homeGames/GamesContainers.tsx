import { useEffect, useRef, useState } from "react";
import { Game as GameComponent } from "./Game";
import { useReadApi } from "../../hooks/useReadApi";
import type { HomeData } from "../../hooks/useReadApi";

/* Este componente es para contener todos los componentes de cada juego. al principio podemos identificar con el primer useEffect Que sirve para:  Cuando el usuario está haciendo scroll hacia abajo y la pantalla está llegando a su límite del alto de toda la home,  identifico cuando faltan 200 píxeles para que la pantalla sigue bottom de la home, y cuando se logra esto ahí hago la llamada a la api para que me dé 10 elementos más. Luego en el segundo useEffect es simplemente un control para que la llamada a la api no se genere muchas veces. Y una vez que termina de extraer los 2000 elementos de la lista del backend se muestra un pequeño mensaje de que ahí más juegos para mostrar  */

export const GamesContainers: React.FC = () => {
  const { data, getMoreData } = useReadApi();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const [hasReachedBottom, setHasReachedBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current && !hasReachedBottom) { 
        const distanceToBottom = containerRef.current.offsetHeight - (window.scrollY + window.innerHeight);
        setIsNearBottom(distanceToBottom <= 200 ? true : false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasReachedBottom]);

  useEffect(() => {
    if (isNearBottom && !hasReachedBottom) {
        setHasReachedBottom(true);
        getMoreData()
        setHasReachedBottom(false);
    }
  }, [isNearBottom, hasReachedBottom, getMoreData]);

  return (
    <div
      ref={containerRef}
      className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 '
    >
      {data.map((game:HomeData, index) => (
        <GameComponent key={index} game={game} />
      ))}
        <div className="col-span-full text-center py-4 text-gray-500 mt-12">
          No hay más juegos
        </div>
    </div>
  );
};