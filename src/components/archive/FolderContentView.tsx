import React from 'react';
import { ArchiveItem } from './types';
import ClickableArchiveItem from './ClickableArchiveItem';

interface FolderContentViewProps {
  items: ArchiveItem[];
  onItemOpen: (item: ArchiveItem) => void;
}

const FolderContentView: React.FC<FolderContentViewProps> = ({ items, onItemOpen }) => {
  return (
    <div className="window-directory icon-grid">
      {items.map(child => (
        <ClickableArchiveItem key={child.path} item={child} onOpen={onItemOpen} />
      ))}
    </div>
  );
};

export default FolderContentView;
