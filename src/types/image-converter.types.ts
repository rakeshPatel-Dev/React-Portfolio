export type ImageFormat = 'JPG' | 'PNG' | 'WEBP' | 'GIF' | 'BMP';
export type ConversionStatus = 'idle' | 'uploading' | 'converting' | 'completed' | 'error';

export interface ImageFile {
  id: string;
  file: File;
  preview: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

export interface ConvertedImage extends ImageFile {
  convertedBlob: Blob;
  convertedType: ImageFormat;
  newSize: number;
  originalWidth: number;
  originalHeight: number;
  conversionStatus: ConversionStatus;
  compressionRatio?: number;
  selectedForBatch: boolean;
}

export interface ConversionOptions {
  targetFormat: ImageFormat;
  quality: number;
  maxDimension: number;
  maintainAspectRatio: boolean;
}

export interface ImageDimensions {
  width: number;
  height: number;
}