/**
 * Archive Manifest Generator
 * 
 * This script scans the archive directory and generates a manifest JSON file
 * with metadata about all files and directories, including:
 * - Image dimensions
 * - Video dimensions and duration
 * - Auto-generated video thumbnails
 * 
 * Directory Structure:
 * - Input:  static/archive/              (place your archive files here)
 * - Output: src/data/archive-manifest.json  (generated manifest)
 * - Output: static/archive-thumbnails/       (auto-generated video thumbnails)
 * 
 * Usage:
 *   node scripts/generate-archive-manifest.js
 * 
 * Optional Dependencies:
 * - sharp: for image dimensions (npm install sharp)
 * - ffmpeg/ffprobe: for video metadata and thumbnails
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

// Check if sharp is available
let sharp;
try {
  sharp = require('sharp');
} catch (error) {
  console.warn('Sharp not found. Install with: npm install sharp');
  console.warn('Image dimensions will not be available.');
}

// Check if ffprobe is available
function checkFFprobe() {
  try {
    execSync('ffprobe -version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    console.warn('ffprobe not found. Install ffmpeg to get video dimensions and thumbnails.');
    return false;
  }
}

const hasFFprobe = checkFFprobe();

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

function generateHashFromPath(filePath) {
  return crypto.createHash('sha256').update(filePath).digest('hex').substring(0, 16);
}

async function getImageDimensions(filePath) {
  if (!sharp) return null;
  
  try {
    const metadata = await sharp(filePath).metadata();
    return {
      width: metadata.width,
      height: metadata.height
    };
  } catch (error) {
    console.warn(`Failed to get dimensions for image ${filePath}:`, error.message);
    return null;
  }
}

async function getVideoDimensions(filePath) {
  if (!hasFFprobe) return null;
  
  try {
    const command = `ffprobe -v quiet -print_format json -show_format -show_streams "${filePath}"`;
    const output = execSync(command, { encoding: 'utf8' });
    const data = JSON.parse(output);
    
    // Find the video stream
    const videoStream = data.streams.find(stream => stream.codec_type === 'video');
    if (videoStream) {
      return {
        width: parseInt(videoStream.width),
        height: parseInt(videoStream.height),
        duration: parseFloat(data.format.duration) || null
      };
    }
  } catch (error) {
    console.warn(`Failed to get dimensions for video ${filePath}:`, error.message);
  }
  
  return null;
}

async function generateVideoThumbnail(filePath, thumbnailDir) {
  if (!hasFFprobe) return null;

  try {
    const hash = generateHashFromPath(filePath);
    const thumbnailPath = path.join(thumbnailDir, `${hash}.jpg`);

    // Skip if thumbnail already exists
    if (fs.existsSync(thumbnailPath)) {
      return `archive-thumbnails/${hash}.jpg`;
    }

    // Ensure thumbnail directory exists
    if (!fs.existsSync(thumbnailDir)) {
      fs.mkdirSync(thumbnailDir, { recursive: true });
    }

    // Get video duration first
    let duration = 2;
    try {
      const probeCommand = `ffprobe -v quiet -print_format json -show_format "${filePath}"`;
      const probeOutput = execSync(probeCommand, { encoding: 'utf8' });
      const probeData = JSON.parse(probeOutput);
      duration = parseFloat(probeData.format.duration) || 2;
    } catch (e) {
      // Use default duration if probe fails
    }

    // Use 10% of duration or 0.5 seconds, whichever is larger (but not more than 2 seconds)
    const seekTime = Math.min(2, Math.max(0.5, duration * 0.1));
    const command = `ffmpeg -i "${filePath}" -ss ${seekTime.toFixed(2)} -vframes 1 -q:v 2 -s 320x240 "${thumbnailPath}" -y`;

    execSync(command, { stdio: 'ignore' });
    return `archive-thumbnails/${hash}.jpg`;
  } catch (error) {
    console.warn(`Failed to generate thumbnail for video ${filePath}:`, error.message);
    return null;
  }
}

function getFileType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  
  const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'];
  const videoExts = ['.mp4', '.mov', '.avi', '.webm', '.mkv'];
  const audioExts = ['.mp3', '.wav', '.m4a', '.aac'];
  const documentExts = ['.pdf', '.doc', '.docx', '.txt', '.md'];
  const codeExts = ['.html', '.css', '.js', '.json', '.tsx', '.jsx'];
  
  if (imageExts.includes(ext)) return 'image';
  if (videoExts.includes(ext)) return 'video';
  if (audioExts.includes(ext)) return 'audio';
  if (documentExts.includes(ext)) return 'document';
  if (codeExts.includes(ext)) return 'code';
  
  return 'other';
}

async function traverseDirectory(dirPath, basePath = '', thumbnailDir = null) {
  const items = [];
  
  try {
    const entries = fs.readdirSync(dirPath);
    
    for (const entry of entries) {
      // Skip hidden files and .DS_Store
      if (entry.startsWith('.') || entry.startsWith('_')) continue;
      
      const fullPath = path.join(dirPath, entry);
      const relativePath = path.join(basePath, entry);
      const stats = fs.statSync(fullPath);
      
      if (stats.isDirectory()) {
        const dirItem = {
          name: entry,
          type: 'directory',
          path: relativePath,
          children: await traverseDirectory(fullPath, relativePath, thumbnailDir)
        };
        items.push(dirItem);
      } else {
        const fileType = getFileType(entry);
        const fileItem = {
          name: entry,
          type: 'file',
          path: relativePath,
          size: getFileSize(fullPath),
          fileType: fileType,
          extension: path.extname(entry).toLowerCase()
        };

        // Add dimensions for images and videos
        if (fileType === 'image') {
          const dimensions = await getImageDimensions(fullPath);
          if (dimensions) {
            fileItem.width = dimensions.width;
            fileItem.height = dimensions.height;
          }
        } else if (fileType === 'video') {
          const videoDimensions = await getVideoDimensions(fullPath);
          if (videoDimensions) {
            fileItem.width = videoDimensions.width;
            fileItem.height = videoDimensions.height;
            if (videoDimensions.duration) {
              fileItem.duration = videoDimensions.duration;
            }
          }
          
          // Generate thumbnail for videos
          if (thumbnailDir) {
            const thumbnailPath = await generateVideoThumbnail(fullPath, thumbnailDir);
            if (thumbnailPath) {
              fileItem.thumbnail = thumbnailPath;
            }
          }
        }
        
        items.push(fileItem);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error.message);
  }
  
  return items.sort((a, b) => {
    // Directories first, then files
    if (a.type !== b.type) {
      return a.type === 'directory' ? -1 : 1;
    }
    // Then alphabetically
    return a.name.localeCompare(b.name);
  });
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function addFormattedSize(items) {
  return items.map(item => {
    if (item.type === 'file') {
      item.sizeFormatted = formatBytes(item.size);
    } else if (item.type === 'directory') {
      item.children = addFormattedSize(item.children);
    }
    return item;
  });
}

// Main execution
async function generateManifest() {
  const archivePath = path.join(__dirname, '../static/archive');
  const thumbnailPath = path.join(__dirname, '../static/archive-thumbnails');
  const outputPath = path.join(__dirname, '../src/data/archive-manifest.json');

  console.log('Generating archive manifest...');
  console.log('Archive path:', archivePath);
  console.log('Thumbnail path:', thumbnailPath);
  console.log('Output path:', outputPath);

  console.log('Traversing archive directory and processing media files...');
  const items = await traverseDirectory(archivePath, '', thumbnailPath);

  const manifest = {
    generatedAt: new Date().toISOString(),
    rootPath: 'archive',
    thumbnailPath: 'archive-thumbnails',
    items: addFormattedSize(items)
  };

  // Ensure the data directory exists
  const dataDir = path.dirname(outputPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Write the manifest
  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));

  console.log('Archive manifest generated successfully!');
  console.log(`Total top-level items: ${manifest.items.length}`);
  
  // Count media files processed
  function countMediaFiles(items) {
    let imageCount = 0;
    let videoCount = 0;
    let thumbnailCount = 0;
    
    for (const item of items) {
      if (item.type === 'file') {
        if (item.fileType === 'image' && item.width && item.height) {
          imageCount++;
        }
        if (item.fileType === 'video') {
          if (item.width && item.height) videoCount++;
          if (item.thumbnail) thumbnailCount++;
        }
      } else if (item.type === 'directory' && item.children) {
        const childCounts = countMediaFiles(item.children);
        imageCount += childCounts.imageCount;
        videoCount += childCounts.videoCount;
        thumbnailCount += childCounts.thumbnailCount;
      }
    }
    
    return { imageCount, videoCount, thumbnailCount };
  }
  
  const counts = countMediaFiles(manifest.items);
  console.log(`Processed ${counts.imageCount} images with dimensions`);
  console.log(`Processed ${counts.videoCount} videos with dimensions`);
  console.log(`Generated ${counts.thumbnailCount} video thumbnails`);
}

// Run the async function
generateManifest().catch(error => {
  console.error('Error generating manifest:', error);
  process.exit(1);
});
