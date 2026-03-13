import type { ImageFile, ConvertedImage, ConversionOptions, ImageFormat } from '@/types/image-converter.types';
import { ImageProcessor } from './image-processor.service';

export class ConversionService {
  static async convertFiles(
    files: ImageFile[],
    options: ConversionOptions,
    onProgress?: (progress: number) => void
  ): Promise<ConvertedImage[]> {
    const converted: ConvertedImage[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      try {
        const { blob, dimensions } = await ImageProcessor.convertImage(file.file, options);
        
        const newSize = blob.size;
        const compressionRatio = file.size > 0 
          ? Math.round((1 - newSize / file.size) * 100) 
          : 0;

        converted.push({
          ...file,
          convertedBlob: blob,
          convertedType: options.targetFormat,
          newSize,
          originalWidth: dimensions.width,
          originalHeight: dimensions.height,
          conversionStatus: 'completed',
          compressionRatio,
          selectedForBatch: true
        });

        onProgress?.(((i + 1) / files.length) * 100);
      } catch (error) {
        console.error(`Failed to convert ${file.name}:`, error);
        throw error;
      }
    }

    return converted;
  }

  static getOutputFileName(originalName: string, targetFormat: ImageFormat): string {
    const baseName = originalName.replace(/\.[^/.]+$/, '');
    return `converted_${baseName}.${targetFormat.toLowerCase()}`;
  }
}