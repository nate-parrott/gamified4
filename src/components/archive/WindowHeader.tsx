import './windowHeader.css';
import React from 'react';

interface WindowHeaderProps {
  title: string;
  onClose: () => void;
  onMouseDown: (e: React.MouseEvent) => void;
}

const WindowHeader: React.FC<WindowHeaderProps> = ({ title, onClose, onMouseDown }) => {
  return (
    <div className="window-titlebar" onMouseDown={onMouseDown}>
      <div className="window-controls">
        <button 
          className="window-close-btn"
          onClick={onClose}
        />
      </div>
      <div className="window-title">{title}</div>
    </div>
  );
};

export default WindowHeader;
