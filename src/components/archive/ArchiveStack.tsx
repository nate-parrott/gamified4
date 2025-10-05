import React from 'react';
import ArchiveCard from './ArchiveCard';
import { useArchiveData } from './useArchiveData';
import { useScrollTracking } from './useScrollTracking';
import './archive.css';
import { ArchiveItem } from './types';
import { useSpring } from 'use-spring';

export default function ArchiveStack() {
  const { allItems } = useArchiveData();
  const { stackRef, getCurrentItemIndex, isStackVisible, commuteRef, getCommuteProgress } = useScrollTracking();
  
  const getStackItems = () => {
    const currentIndex = getCurrentItemIndex(allItems.length);
    const stackItems = [];
    
    for (let i = 0; i < 6; i++) {
      const itemIndex = currentIndex + i;
      if (itemIndex < allItems.length) {
        stackItems.push({
          item: allItems[itemIndex],
          stackPosition: i
        });
      }
    }
    
    return stackItems;
  };

  const stackItems = getStackItems();
  console.log(stackItems);

  const [stackVisibleAmount, _isMoving] = useSpring(isStackVisible() ? 1 : 0, {
    stiffness: 60,
    damping: 10,
    decimals: 6
  })

  return (
    <div className="archive-embed">
      <div className="archive-commute" ref={commuteRef}></div>
      <div className="archive-stack-container">
        <div 
          ref={stackRef}
          className="archive-scroll-spacer" 
          style={{ height: `${allItems.length * 100}px` }}
        />

        <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', color: 'red'}}>
          {`progress: ${getCommuteProgress().toFixed(2)}`}
        </div>
        
        {stackVisibleAmount > 0 && stackItems.length > 0 && (
          <div className="archive-stack-overlay">
            <div className="archive-card-stack">
              {stackItems.map(({ item, stackPosition }) => {
                return <ArchiveCard key={`${item.path}-${stackPosition}`} item={item} stackPosition={stackPosition} stackVisibleAmount={stackVisibleAmount} />;
              })}
            </div>
          </div>
        )}
        
        <div className="archive-content-after">
          <h1>Archive Complete</h1>
          <p>You've explored all {allItems.length} items in the archive.</p>
        </div>
      </div>
    </div>
  );
}

// const ArchiveCardWrapper = ({ item, stackPosition, stackVisibleAmount }: { item: ArchiveItem, stackPosition: number, stackVisibleAmount: MotionValue<number> }) => {
//   return (
//     <ArchiveCard item={item} stackPosition={stackPosition} style={{ transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`, filter: `brightness(${brightness})`, zIndex: zIndex }} />
//   );
// }
