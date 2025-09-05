import React from 'react';
import { ArchiveItem } from './types';

interface FileContentViewProps {
  item: ArchiveItem;
}

const FileContentView: React.FC<FileContentViewProps> = ({ item }) => {
  const filePath = `/archive/${item.path}`;

  switch (item.fileType) {
    case 'image':
      return (
        <div className="window-preview">
          <img src={filePath} alt={item.name} />
        </div>
      );
    case 'video':
      return (
        <div className="window-preview">
          <video controls>
            <source src={filePath} type={`video/${item.extension?.slice(1)}`} />
          </video>
        </div>
      );
    default:
      return (
        <div className="window-file-info">
          <div className="file-details">
            <div className="file-size">{item.sizeFormatted}</div>
            <div className="file-type">{item.fileType || 'file'}</div>
            <a href={filePath} target="_blank" rel="noopener noreferrer" className="file-open-btn">
              Open
            </a>
          </div>
        </div>
      );
  }
};

export default FileContentView;
