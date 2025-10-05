import { useMemo } from 'react';
import archiveManifest from '../../data/archive-manifest.json';
import { ArchiveItem, ArchiveManifest } from './types';

export function useArchiveData(): { allItems: ArchiveItem[] } {
  const manifest = archiveManifest as unknown as ArchiveManifest;
  
  const allItems = useMemo(() => {
    const flattenItems = (items: ArchiveItem[], result: ArchiveItem[] = [], parentPath = ''): ArchiveItem[] => {
      for (const item of items) {
        const fullPath = parentPath ? `${parentPath}/${item.name}` : item.name;
        
        // Skip items that start with underscore or are in _shared directory
        if (!item.name.startsWith('_') && !fullPath.startsWith('_shared/') && fullPath !== '_shared') {
          result.push(item);
        }
        
        // Continue recursing through children unless we're in _shared directory
        if (item.children && !fullPath.startsWith('_shared')) {
          flattenItems(item.children, result, fullPath);
        }
      }
      return result;
    };
    return flattenItems(manifest.items);
  }, [manifest.items]);

  return { allItems };
}
