import React, { useState, memo } from 'react';

export interface GameProps {
  game: {
    thumbnail: string;
    title: string;
  };
}

export const Game: React.FC<GameProps> = memo(({ game }) => {
    const [isHovering, setIsHovering] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const { title, thumbnail } = game;

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

  return (
    <article
      className="relative flex flex-col cursor-pointer group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="order-2 flex justify-between mt-1">
        <h2 className="font-semibold uppercase text-green-200 block w-[70%] text-sm/5  mid:text-base">{title}</h2>
        <div className='2xl:hidden w-[30%] flex justify-end'>
          <span className='truncate'>Ver mas</span>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={thumbnail}
          alt={title}
          className="w-full rounded-lg transition-all duration-300 group-hover:scale-105"
          style={{ opacity: isHovering ? 0.7 : 1 }}
        />
        <div
          className={`hidden 2xl:flex absolute bottom-0 left-0 right-0 h-[90%]  items-end justify-center bg-gradient-to-t from-gray-300 transition-opacity duration-300 ${
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
        </div>
      </div>
    </article>
  );
});