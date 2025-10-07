import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useArchiveData } from './useArchiveData';
import { ArchiveItem } from './types';
import { withPrefix } from '../utils';
import './lightbox.css';

export function LightboxViewer() {
  const { allItems } = useArchiveData();
  
  // Filter to only image and video items
  const viewableItems = useMemo(() => {
    return allItems.filter(item => 
      item.type === 'file' && (item.fileType === 'image' || item.fileType === 'video')
    );
  }, [allItems]);

  const [currentPath, setCurrentPath] = useState<string | null>(null);
  const [controlsVisible, setControlsVisible] = useState(true);

  // Read hash on mount and when it changes
  useEffect(() => {
    const readHash = () => {
      if (typeof window === 'undefined') return;
      const hash = window.location.hash;
      const match = hash.match(/#view=(.+)/);
      if (match) {
        const path = decodeURIComponent(match[1]);
        setCurrentPath(path);
      } else {
        setCurrentPath(null);
      }
    };

    readHash();
    window.addEventListener('hashchange', readHash);
    return () => window.removeEventListener('hashchange', readHash);
  }, []);

  const currentIndex = useMemo(() => {
    if (!currentPath) return -1;
    return viewableItems.findIndex(item => item.path === currentPath);
  }, [currentPath, viewableItems]);

  const currentItem = currentIndex >= 0 ? viewableItems[currentIndex] : null;
  const prevItem = currentIndex > 0 ? viewableItems[currentIndex - 1] : null;
  const nextItem = currentIndex >= 0 && currentIndex < viewableItems.length - 1
    ? viewableItems[currentIndex + 1]
    : null;

  const navigateTo = useCallback((index: number) => {
    if (index < 0 || index >= viewableItems.length) return;
    const item = viewableItems[index];
    const encodedPath = encodeURIComponent(item.path);
    // Use replaceState to avoid polluting history
    window.history.replaceState(null, '', `#view=${encodedPath}`);
    setCurrentPath(item.path);
  }, [viewableItems]);

  const navigatePrev = useCallback(() => {
    if (currentIndex > 0) {
      navigateTo(currentIndex - 1);
    }
  }, [currentIndex, navigateTo]);

  const navigateNext = useCallback(() => {
    if (currentIndex < viewableItems.length - 1) {
      navigateTo(currentIndex + 1);
    }
  }, [currentIndex, viewableItems.length, navigateTo]);

  const close = useCallback(() => {
    // Close the window/tab
    window.close();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!currentItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigatePrev();
        setControlsVisible(false);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateNext();
        setControlsVisible(false);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        close();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentItem, navigatePrev, navigateNext, close]);

  // Show controls on mouse movement
  useEffect(() => {
    const handleMouseMove = () => {
      setControlsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!currentItem) return null;

  const canGoPrev = !!prevItem;
  const canGoNext = !!nextItem;

  const renderMedia = (item: ArchiveItem, hidden = false) => {
    const key = hidden ? `preload-${item.path}` : item.path;
    const hiddenStyle = hidden ? { display: 'none' as const } : undefined;

    if (item.fileType === 'video') {
      return (
        <video
          key={key}
          src={withPrefix('archive/' + item.path)}
          autoPlay={!hidden}
          loop={!hidden}
          muted
          playsInline
          preload={hidden ? 'auto' : undefined}
          className="lightbox-media"
          style={hiddenStyle}
        />
      );
    }

    return (
      <img
        key={key}
        src={withPrefix('archive/' + item.path)}
        alt={item.name}
        className="lightbox-media"
        style={hiddenStyle}
      />
    );
  };

  return (
    <div className={`lightbox-overlay ${controlsVisible ? '' : 'cursor-hidden'}`}>
      <div className="lightbox-content">
        {renderMedia(currentItem)}
        {prevItem ? renderMedia(prevItem, true) : null}
        {nextItem ? renderMedia(nextItem, true) : null}
      </div>

      <div className={`lightbox-controls ${controlsVisible ? 'visible' : 'hidden'}`}>
        <div className="lightbox-gradient" />
        <div className="lightbox-label">{currentItem.name}</div>
        <div className="lightbox-buttons">
          <button
            className="lightbox-button lightbox-button-prev"
            onClick={navigatePrev}
            disabled={!canGoPrev}
            aria-label="Previous"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            className="lightbox-button lightbox-button-close"
            onClick={close}
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <button
            className="lightbox-button lightbox-button-next"
            onClick={navigateNext}
            disabled={!canGoNext}
            aria-label="Next"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
