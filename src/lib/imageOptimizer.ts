/**
 * Client-Side Image Optimizer
 * Resizes and compresses images to ensure they stay under Firestore's 1MB document limit
 * and localStorage quota, while preserving crisp HD visual fidelity for clinic media.
 */

export interface OptimizedImageResult {
  dataUrl: string;
  width: number;
  height: number;
  sizeBytes: number;
  sizeFormatted: string;
}

export async function optimizeImageFile(
  file: File,
  maxWidth = 1600,
  maxHeight = 1000,
  quality = 0.82
): Promise<OptimizedImageResult> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Selected file is not an image.'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;

        // Calculate aspect ratio preserving dimensions
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to create canvas context.'));
          return;
        }

        // Enable high-quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Export as JPEG for best compression ratio or PNG if source was SVG/transparent
        const isTransparent = file.type === 'image/png' || file.type === 'image/svg+xml';
        const mimeType = isTransparent && width <= 800 ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(mimeType, quality);

        // Calculate size
        const head = `data:${mimeType};base64,`;
        const sizeBytes = Math.round(((dataUrl.length - head.length) * 3) / 4);
        const sizeFormatted = sizeBytes > 1024 * 1024 
          ? `${(sizeBytes / (1024 * 1024)).toFixed(2)} MB`
          : `${Math.round(sizeBytes / 1024)} KB`;

        resolve({
          dataUrl,
          width,
          height,
          sizeBytes,
          sizeFormatted,
        });
      };

      img.onerror = () => {
        reject(new Error('Failed to load image for optimization.'));
      };

      img.src = readerEvent.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file from disk.'));
    };

    reader.readAsDataURL(file);
  });
}
