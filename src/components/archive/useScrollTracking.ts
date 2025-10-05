import { useState, useEffect, useRef } from 'react';

interface ScrollTracking {
  scrollY: number;
  stackRef: React.RefObject<HTMLDivElement>;

  getCommuteProgress: () => number;
  commuteRef: React.RefObject<HTMLDivElement>;

  getCurrentItemIndex: (totalItems: number) => number;
  getCurrentItemIndexFractional: (totalItems: number) => number;
  isStackVisible: () => boolean;
}

export function useScrollTracking(): ScrollTracking {
  const [scrollY, setScrollY] = useState(0);
  const stackRef = useRef<HTMLDivElement>(null);
  const commuteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // const getCurrentItemIndex = (totalItems: number) => {
  //   if (!stackRef.current) return 0;
    
  //   const rect = stackRef.current.getBoundingClientRect();
  //   const scrollIntoStack = Math.max(0, -rect.top);
  //   return Math.min(Math.floor(scrollIntoStack / 100), totalItems - 1);
  // };

  const getCurrentItemIndexFractional = (totalItems: number) => {
    if (!stackRef.current) return 0;
    
    const rect = stackRef.current.getBoundingClientRect();
    const scrollIntoStack = Math.max(0, -rect.top);
    return Math.max(0, Math.min(scrollIntoStack / 100, totalItems - 1));
  }

  const getCurrentItemIndex = (totalItems: number) => {
    const fractionalIndex = getCurrentItemIndexFractional(totalItems);
    return Math.floor(fractionalIndex)
  }

  const isStackVisible = () => {
    if (!stackRef.current) return false;
    
    const rect = stackRef.current.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  };


  const getCommuteProgress = () => {
    if (!commuteRef.current) return 0;
    
    const rect = commuteRef.current.getBoundingClientRect();
    const progress = Math.max(0, -rect.top) / Math.max(100, rect.height - window.innerHeight);
    return Math.min(Math.max(0, progress), 1);
  }
  

  return { scrollY, stackRef, getCurrentItemIndex, getCurrentItemIndexFractional, isStackVisible, getCommuteProgress, commuteRef };
}

