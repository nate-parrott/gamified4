import React, { useCallback, useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { useArchiveData } from './useArchiveData';
import './archive.css';
import { ArchiveItem } from './types';
import FixedTop from './FixedTop.svg';
import FixedBottom from './FixedBottom.svg';
import Sliding from './Sliding.svg';
import PostIt from './PostIt.svg';
import { remap } from '../utils';
import { useFullscreenPreviewPresenter } from './FullscreenPreview';
import {isMobile} from 'react-device-detect';
import ActivityStore from '../activityStore';
import { ModalPlaylist } from '../modalPlayer';
import { coinUnlockModalItem } from '../coinUnlockModalItem';
import { Incentives } from '../incentives';

interface ArchiveProps {
  activityStore: ActivityStore;
  playPlaylist: (playlist: ModalPlaylist) => void;
}

export interface ArchiveRef {
  scrollToAndOpen: () => void;
}

const Archive = forwardRef<ArchiveRef, ArchiveProps>(({ activityStore, playPlaylist }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const everOpen = useRef(false);
  everOpen.current = everOpen.current || isOpen;

  // Flip `processHovers` when `isOpen` changes; delay by 1000ms
  const [delayedIsOpen, setDelayedIsOpen] = useState(false);
  useEffect(() => {
    const open = isOpen;
    setTimeout(() => {
      setDelayedIsOpen(open);
    }, 1000);
  }, [isOpen]);

  const isTallViewport = typeof window !== 'undefined' && window.innerHeight > window.innerWidth * 1.2;
  const scootDrawerBackAmt = isOpen && !isTallViewport;
  const cabinetBaseY = scootDrawerBackAmt ? -0.11 : 0;
  const slideDist = 0.822;
  const peekAmount = (!isOpen && isHovering) ? 0.025 : 0;
  const drawerBaseY = cabinetBaseY - 0.762 + (isOpen ? slideDist : 0) + peekAmount;
  // Drawer content is 0.77
  const drawerClipperHeight = isOpen ? slideDist : 0;
  const drawerClipperTop = cabinetBaseY + 0.117 + (isOpen ? slideDist : 0) - drawerClipperHeight;

  const openArchive = useCallback(() => {
    setIsOpen(true);
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const closeArchive = useCallback(() => {
    setIsOpen(false);
  }, []);

  useImperativeHandle(ref, () => ({
    scrollToAndOpen: openArchive
  }));

  const onClick = useCallback(() => {
    // Check if archive is unlocked
    const isUnlocked = activityStore.hasIncentive('archive');
    
    if (isOpen) {
      closeArchive();
      return;
    }

    if (!isUnlocked) {
      // Show unlock modal
      const archiveIncentive = Incentives.find(i => i.id === 'archive');
      if (!archiveIncentive) return;
      
      const canUnlock = activityStore.coinBalance() >= archiveIncentive.cost;
      playPlaylist(new ModalPlaylist([coinUnlockModalItem(() => {
        if (!canUnlock) {
          return;
        }
        activityStore.unlockIncentive(archiveIncentive);
        setTimeout(() => {
          openArchive();
        }, 200);
      }, !canUnlock)]));
      return;
    }

    // If unlocked, just open it
    openArchive();
  }, [isOpen, activityStore, playPlaylist, openArchive, closeArchive]);
  
  // Handle Escape key to close the archive
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeArchive]);

  const {hoverRef, preview} = useFullscreenPreviewPresenter(isOpen && delayedIsOpen);
  
  const isUnlocked = activityStore.hasIncentive('archive');
  
  return (
    <div 
      ref={containerRef} 
      className={`archive-container ${isOpen ? 'open' : 'closed'}`}
    >
      <img className="fullsize" src={FixedBottom} style={{ top: `calc(var(--size) * ${cabinetBaseY})` }} />
      <img className="fullsize" src={Sliding} style={{ top: `calc(var(--size) * ${drawerBaseY})` }} />
      <div className="drawer-contents-clipper" style={{ top: `calc(var(--size) * ${drawerClipperTop})`, height: `calc(var(--size) * ${drawerClipperHeight})` }}>
        <div className="drawer-contents">
          { everOpen.current ? <DrawerContentInner hoverRef={hoverRef} /> : null }
        </div>
      </div>
      <img className="fullsize" src={FixedTop} style={{ top: `calc(var(--size) * ${cabinetBaseY})` }} />
      <div className='fullscreen-artifact'>{preview}</div>
      {!isOpen && (
        <div 
          className="archive-click-target"
          onClick={onClick}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        />
      )}
      {isOpen ? <OpenPostItNote /> : <NotOpenPostItNote isUnlocked={isUnlocked} />}
    </div>
  )
});

const NotOpenPostItNote = ({ isUnlocked }: { isUnlocked: boolean }) => {
  const text = isUnlocked 
    ? "this is the archive. a jumble of unorganized work. click to open" 
    : "this is the archive. a jumble of unorganized work. click to unlock";
  return (
    <PostItNote text={text} style={{ top: `calc(var(--size) * 0.1)`, left: `calc(50% - var(--size) * 0.3)` }} />
  )
}

const OpenPostItNote = () => {
  const hint = isMobile ? 'drag your finger across the files to browse; tap with another finger to open in a new tab.' : 'hover on a file to browse; click to open in a new tab.';
  return (
    <PostItNote text={hint} style={{ top: `calc(var(--size) * 0.4)`, left: `calc(50% - var(--size) * 0.4)` }} />
  )
}

/*
  top: calc(var(--size) * 0.6);
  left: calc(50% - 100px);
*/

interface PostItNoteProps {
  text: string;
  style?: React.CSSProperties;
}

export function PostItNote({text, style}: PostItNoteProps) {
  return (
    <div className="post-it-note" style={style}>
      <div className="post-it-text">
        {text}
      </div>
    </div>
  );
}

function DrawerContentInner({hoverRef}: {hoverRef: React.RefObject<HTMLDivElement>}) {
  const {allItems} = useArchiveData();
  const filteredItems = allItems.filter(i => 
  i.type === 'file' && i.thumbnail || i.type === 'directory'
  )
  const renderedItems = keepAtMostN(filteredItems, 30);

  return (
    <div className="drawer-content-inner" ref={hoverRef}>
      {renderedItems.map((item, i) => {
        const t = i / renderedItems.length;
        const scale = remap(t, 0, 1, 0.7, 1);
        const transform = `scale(${scale}) rotateX(-20deg)`;
        return (
          <div className="rotated-drawer-item" key={item.path} style={{ transform }}>
            <ArchiveItemCard item={item} />
          </div>
        )
      })}
    </div>
  )
}

function ArchiveItemCard({item}: {item: ArchiveItem}) {
  if (item.type === 'directory') {
    return (
      <div className="archive-item-card directory">
        <h3>{item.name}</h3>
      </div>
    )
  }
  return (
    <div className="archive-item-card file" style={{ backgroundImage: `url(${item.thumbnail})` }} />
  )
}

function keepAtMostN<T>(array: T[], n: number): T[] {
  const frac = n / array.length;
  let k = 0;
  return array.filter((item, index) => {
    k += frac;
    if (k >= 1) {
      k = 0;
      return true;
    }
    return false;
  });
}

export default Archive;
