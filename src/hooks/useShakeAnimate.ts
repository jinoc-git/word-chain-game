import React from 'react';

const useShakeAnimate = () => {
  const [isShake, setIsShake] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  const handleShake = () => {
    setIsShake(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsShake(false);
    }, 820);
  };

  return { isShake, handleShake };
};

export default useShakeAnimate;
