import { useEffect, useRef, useState } from 'react';

export const useVisibility = (offset = 48) => {
  const [isVisible, setIsVisible] = useState(true);
  const currentElement = useRef(null);

  const onScroll = () => {
    if (!currentElement.current) {
      setIsVisible(true);
      return;
    }
    const { top } = currentElement.current.getBoundingClientRect();

    setIsVisible(top + offset >= 0 && top - offset <= window.innerHeight);
  };

  useEffect(() => {
    document.addEventListener('scroll', onScroll, true);
    return () => document.removeEventListener('scroll', onScroll, true);
  });

  return [isVisible, currentElement];
};
