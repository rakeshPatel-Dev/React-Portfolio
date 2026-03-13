import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import type { ConvertedImage } from '@/types/image-converter.types';
import { ConversionService } from './conversion.service';

export class DownloadService {
  static async downloadSingleImage(image: ConvertedImage): Promise<void> {
    if (!image.convertedBlob) {
      throw new Error('No converted image available');
    }

    const fileName = ConversionService.getOutputFileName(
      image.name,
      image.convertedType
    );

    saveAs(image.convertedBlob, fileName);
  }

  static async downloadAsZip(images: ConvertedImage[]): Promise<void> {
    if (images.length === 0) {
      throw new Error('No images to download');
    }

    const zip = new JSZip();
    
    const validImages = images.filter(image => image.convertedBlob);
   
   if (validImages.length === 0) {
     throw new Error('No converted images available');
   }
   
   validImages.forEach(image => {
      const fileName = ConversionService.getOutputFileName(
        image.name,
        image.convertedType
      );
      
      zip.file(fileName, image.convertedBlob!);
    });

    const content = await zip.generateAsync({ 
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 }
    });
    
    saveAs(content, 'converted-images.zip');
  }
}