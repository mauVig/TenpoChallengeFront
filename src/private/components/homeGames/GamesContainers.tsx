import { useEffect, useRef, useState } from "react";
import { Game as GameComponent } from "./Game";
import { useReadApi } from "../../hooks/useReadApi";

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
      className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8'
    >
      {data.map((game, index) => (
        <GameComponent key={index} game={game} />
      ))}
      {hasReachedBottom && (
        <div className="col-span-full text-center py-4 text-gray-500">
          No hay más juegos
        </div>
      )}
    </div>
  );
};