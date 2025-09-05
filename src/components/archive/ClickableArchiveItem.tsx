import './clickableArchiveItem.css';
import React from 'react';
import { ArchiveItem } from './types';

const Icon = ({ item }: { item: ArchiveItem }) => {
  if (item.type === 'directory') {
    return <div className="folder-icon-image" />;
  }
  if (item.fileType === 'image' || item.fileType === 'video') {
    const thumbPath = item.thumbnail || `archive/${item.path}`;
    if (item.width && item.height && thumbPath) {
      const style: React.CSSProperties = {
        aspectRatio: `${item.width} / ${item.height}`,
      };
      const scale = Math.min(1, 42 / Math.max(item.width, item.height));
      const width = item.width * scale;
      const height = item.height * scale;
      style.width = width;
      style.height = height;
      return <img src={`/${thumbPath}`} className="icon-thumbnail" style={style} />;
    }
  }
  switch (item.fileType) {
    case 'file': return <div className="emoji-icon">📄</div>
    case 'image': return <div className="emoji-icon">🖼️</div>
    case 'video': return <div className="emoji-icon">🎬</div>
    case 'audio': return <div className="emoji-icon">🎵</div>
    default: return <div className="emoji-icon">📄</div>
  }
};

interface ClickableArchiveItemProps {
  item: ArchiveItem;
  onOpen: (item: ArchiveItem) => void;
}

const ClickableArchiveItem: React.FC<ClickableArchiveItemProps> = ({ item, onOpen }) => {
  return (
    <div
      className="desktop-icon"
      onDoubleClick={() => onOpen(item)}
    >
      <div className="icon-container">
        <Icon item={item} />
        {/* {item.type === 'directory' ? '📁' : getFileIcon(item.fileType || 'other')} */}
      </div>
      <div className="icon-label">{item.name}</div>
    </div>
  );
};

export default ClickableArchiveItem;
