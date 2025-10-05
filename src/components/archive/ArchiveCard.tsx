import React from 'react';
import { ArchiveItem } from './types';

interface ArchiveCardProps {
  item: ArchiveItem;
  stackPosition: number;
  stackVisibleAmount: number;
}

export default function ArchiveCard({ item, stackPosition, stackVisibleAmount }: ArchiveCardProps) {
  const scale = 1 - (stackPosition * 0.01);
  const translateY = -stackPosition * 10 + (1 - stackVisibleAmount) * window.innerHeight;
  const translateX = 0;
  const brightness = Math.max(0.4, 1 - (stackPosition * 0.08));
  const zIndex = 100 - stackPosition;

  const renderContent = () => {
    const isTopN = stackPosition < 2;
    return <Content item={item} isTopN={isTopN} />;
  };

  return (
    <div className="archive-card" style={{ transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`, filter: `brightness(${brightness})`, zIndex: zIndex }}>
      <div className="archive-card-content">
        {renderContent()}
        <div className="archive-card-overlay">
          <h3 className="archive-card-title">{item.name}</h3>
          <p className="archive-card-path">{item.path}</p>
        </div>
      </div>
    </div>
  );
}

function Content({item, isTopN}: {item: ArchiveItem, isTopN: boolean}) {
  if (!isTopN) {
    return <></>;
  }

  const mediaPath = `/archive/${item.path}`;
  const thumbnailPath = item.thumbnail ? `/archive-thumbnails/${item.thumbnail}` : null;
  
  if (item.type === 'directory') {
    return (
      <div className="archive-card-folder">
        {item.name}
      </div>
    );
  }
  
  if (item.fileType === 'image') {
    const src = isTopN ? mediaPath : (thumbnailPath || mediaPath);
    return (
      <div className="archive-card-media">
        <img src={src} alt={item.name} loading="lazy" />
      </div>
    );
  }
  
  if (item.fileType === 'video') {
    if (isTopN) {
      return (
        <div className="archive-card-media">
          <video 
            src={mediaPath}
            muted
            autoPlay
            loop
            preload="metadata"
            poster={thumbnailPath || undefined}
          />
        </div>
      );
    } else {
      return (
        <div className="archive-card-media">
          <img 
            src={thumbnailPath || mediaPath}
            alt={`${item.name} thumbnail`}
            loading="lazy"
          />
        </div>
      );
    }
  }
  
  if (thumbnailPath) {
    return (
      <div className="archive-card-media">
        <img src={thumbnailPath} alt={`${item.name} thumbnail`} loading="lazy" />
      </div>
    );
  }
  
  return (
    <div className="archive-card-folder">
      {item.name}
    </div>
  );
}
