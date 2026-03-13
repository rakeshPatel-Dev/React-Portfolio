import type { ImageFormat, ConversionOptions, ImageDimensions } from '@/types/image-converter.types';

export class ImageProcessor {
  private static readonly MAX_DIMENSION = 3840; // 4K support
  private static readonly SUPPORTED_FORMATS: ImageFormat[] = ['JPG', 'PNG', 'WEBP', 'GIF', 'BMP'];

  static isFormatSupported(format: string): format is ImageFormat {
    return this.SUPPORTED_FORMATS.includes(format as ImageFormat);
  }

  static qualityApplicable(format: ImageFormat): boolean {
    return ['JPG', 'WEBP'].includes(format);
  }

  static async getImageDimensions(file: File): Promise<ImageDimensions> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(img.src);
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = () => reject(new Error('Failed to load image'));
    });
  }

  static calculateDimensions(
    originalWidth: number,
    originalHeight: number,
    maxDimension: number = this.MAX_DIMENSION
  ): ImageDimensions {
    if (originalWidth <= maxDimension && originalHeight <= maxDimension) {
      return { width: originalWidth, height: originalHeight };
    }

    const ratio = originalWidth / originalHeight;
    
    if (originalWidth > originalHeight) {
      return {
        width: maxDimension,
        height: Math.round(maxDimension / ratio)
      };
    } else {
      return {
        width: Math.round(maxDimension * ratio),
        height: maxDimension
      };
    }
  }

  static async convertImage(
    file: File,
    options: ConversionOptions
  ): Promise<{ blob: Blob; dimensions: ImageDimensions }> {
    const img = await this.loadImage(file);
    const dimensions = this.calculateDimensions(img.width, img.height, options.maxDimension);
    
    const canvas = document.createElement('canvas');
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get canvas context');

    // Apply high-quality image rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height);

    const mimeType = this.getMimeType(options.targetFormat);
    const quality = this.qualityApplicable(options.targetFormat) ? options.quality / 100 : undefined;

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) reject(new Error('Conversion failed'));
          else resolve({ blob, dimensions });
        },
        mimeType,
        quality
      );
    });
  }

  private static loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(img.src);
        resolve(img);
      };
      img.onerror = () => reject(new Error('Failed to load image'));
    });
  }

  private static getMimeType(format: ImageFormat): string {
    const mimeTypes: Record<ImageFormat, string> = {
      JPG: 'image/jpeg',
      PNG: 'image/png',
      WEBP: 'image/webp',
      GIF: 'image/gif',
      BMP: 'image/bmp'
    };
    return mimeTypes[format];
  }
}