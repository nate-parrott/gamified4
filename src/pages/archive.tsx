import React, { useState, useCallback } from 'react';
import { HeadFC, PageProps } from 'gatsby';
import archiveManifest from '../data/archive-manifest.json';
import '../components/archive/archive.css';
import { ArchiveItem, ArchiveManifest, WindowState } from '../components/archive/types';
import Window from '../components/archive/Window';
import ClickableArchiveItem from '../components/archive/ClickableArchiveItem';
// import menu from '../components/archive/menu.png';

const Archive: React.FC<PageProps> = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(1000);
  const manifest = archiveManifest as unknown as ArchiveManifest;

  const findItemByPath = useCallback((path: string, items: ArchiveItem[] = manifest.items): ArchiveItem | null => {
    for (const item of items) {
      if (item.path === path) return item;
      if (item.children) {
        const found = findItemByPath(path, item.children);
        if (found) return found;
      }
    }
    return null;
  }, [manifest.items]);

  const openWindow = useCallback((item: ArchiveItem) => {
    const windowId = `window-${item.path}-${Date.now()}`;
    const newWindow: WindowState = {
      id: windowId,
      item,
      x: 100 + (windows.length * 30),
      y: 100 + (windows.length * 30),
      zIndex: maxZIndex + 1
    };
    
    setWindows(prev => [...prev, newWindow]);
    setMaxZIndex(prev => prev + 1);
  }, [windows.length, maxZIndex]);

  const closeWindow = useCallback((windowId: string) => {
    setWindows(prev => prev.filter(w => w.id !== windowId));
  }, []);

  const bringToFront = useCallback((windowId: string) => {
    setWindows(prev => {
      const currentMax = prev.reduce((m, w) => Math.max(m, w.zIndex), 0);
      const target = prev.find(w => w.id === windowId);
      if (!target || target.zIndex === currentMax) {
        return prev;
      }
      const newZ = currentMax + 1;
      setMaxZIndex(newZ);
      return prev.map(w => (w.id === windowId ? { ...w, zIndex: newZ } : w));
    });
  }, []);

  const updateWindowPosition = useCallback((windowId: string, x: number, y: number) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, x, y } : w
    ));
  }, []);

  const filteredItems = manifest.items.filter(item => !item.name.startsWith('_'));

  return (
    <div className="spatial-finder">
      <div className="menubar">
        {/* <img src={menu} /> */}
      </div>
      <div className="desktop">
        <div className="icon-grid">
          {filteredItems.map(item => (
            <ClickableArchiveItem key={item.path} item={item} onOpen={openWindow} />
          ))}
        </div>
        
        {windows.map(window => (
          <Window 
            key={window.id} 
            window={window}
            onClose={closeWindow}
            onBringToFront={bringToFront}
            onUpdatePosition={updateWindowPosition}
            onItemOpen={openWindow}
          />
        ))}
      </div>
    </div>
  );
};

export default Archive;

export const Head: HeadFC = () => (
  <>
    <title>Archive</title>
    <meta name="description" content="nateparrott.com archive" />
  </>
);
