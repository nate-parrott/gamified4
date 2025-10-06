
export interface ArchiveItem {
  name: string;
  type: 'file' | 'directory';
  path: string;
  size?: number;
  sizeFormatted?: string;
  fileType?: string; // image, video, audio, document, code
  extension?: string;
  children?: ArchiveItem[];
  // Media metadata
  width?: number;
  height?: number;
  duration?: number; // in seconds, for videos
  thumbnail?: string; // relative path to thumbnail image
}

export interface ArchiveManifest {
  generatedAt: string;
  rootPath: string;
  thumbnailPath?: string; // relative path to thumbnails directory
  items: ArchiveItem[];
}

