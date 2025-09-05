import React, { useState, useRef, useCallback } from 'react';
import { WindowState, ArchiveItem } from './types';
import WindowHeader from './WindowHeader';
import FolderContentView from './FolderContentView';
import FileContentView from './FileContentView';

interface WindowProps {
  window: WindowState;
  onClose: (windowId: string) => void;
  onBringToFront: (windowId: string) => void;
  onUpdatePosition: (windowId: string, x: number, y: number) => void;
  onItemOpen: (item: ArchiveItem) => void;
}

const Window: React.FC<WindowProps> = ({
  window,
  onClose,
  onBringToFront,
  onUpdatePosition,
  onItemOpen
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, windowX: 0, windowY: 0 });
  const [isOpening, setIsOpening] = useState(true);
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-close-btn')) return;
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      windowX: window.x,
      windowY: window.y
    });
    onBringToFront(window.id);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    onUpdatePosition(
      window.id,
      dragStart.windowX + deltaX,
      dragStart.windowY + deltaY
    );
  }, [isDragging, dragStart, window.id, onUpdatePosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  React.useEffect(() => {
    setIsOpening(false);
  }, []);

  const renderWindowContent = () => {
    if (window.item.type === 'file') {
      return (
        <FileContentView 
          item={window.item}
        />
      );
    }

    // Directory content
    return (
      <FolderContentView 
        items={window.item.children || []} 
        onItemOpen={onItemOpen}
      />
    );
  };

  const contentClass = window.item.type === 'file' ? 'window-with-file' : 'window-with-directory';

  return (
    <div
      ref={windowRef}
      className={`finder-window ${isDragging ? ' dragging' : ''}${isOpening ? ' animate-in' : ''} ${contentClass}`}
      style={{
        left: window.x,
        top: window.y,
        zIndex: window.zIndex
      }}
    >
      <WindowHeader
        title={window.item.name}
        onClose={() => onClose(window.id)}
        onMouseDown={handleMouseDown}
      />
      <div className="window-content" onMouseDown={() => onBringToFront(window.id)}>
        {renderWindowContent()}
      </div>
    </div>
  );
};

export default Window;
