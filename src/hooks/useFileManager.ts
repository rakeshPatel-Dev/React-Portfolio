import { useState, useCallback, useRef } from 'react';
import type { ImageFile, ConvertedImage, ImageFormat } from '@/types/image-converter.types';
import { ImageProcessor } from '@/services/image-processor.service';
import toast from 'react-hot-toast';

interface UseFileManagerProps {
  maxFiles?: number;
  maxFileSize?: number; // in bytes
  allowedTypes?: string[];
}

export const useFileManager = ({
  maxFiles = 50,
  maxFileSize = 50 * 1024 * 1024, // 50MB default
  allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp']
}: UseFileManagerProps = {}) => {
  const [files, setFiles] = useState<(ImageFile | ConvertedImage)[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback((file: File): string | null => {
    if (!allowedTypes.includes(file.type)) {
      return `File type ${file.type} is not supported`;
    }
    if (file.size > maxFileSize) {
      return `File size exceeds ${maxFileSize / (1024 * 1024)}MB limit`;
    }
    return null;
  }, [allowedTypes, maxFileSize]);

  const generateFileId = useCallback(() => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const addFiles = useCallback(async (fileList: FileList) => {
    if (files.length + fileList.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const newFiles: ImageFile[] = [];
    const errors: string[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const error = validateFile(file);
      
      if (error) {
        errors.push(`${file.name}: ${error}`);
        continue;
      }

      const dimensions = await ImageProcessor.getImageDimensions(file).catch(() => null);
      
      newFiles.push({
        id: generateFileId(),
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        ...(dimensions && {
          originalWidth: dimensions.width,
          originalHeight: dimensions.height
        })
      } as ImageFile & Partial<ConvertedImage>);
    }

    if (errors.length > 0) {
      toast.error(errors.join('\n'));
    }

    if (newFiles.length > 0) {
      setFiles(prev => [...prev, ...newFiles]);
      toast.success(`${newFiles.length} file(s) added successfully`);
    }
  }, [files.length, maxFiles, validateFile, generateFileId]);

  const removeFile = useCallback((id: string) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file?.preview) URL.revokeObjectURL(file.preview);
      return prev.filter(f => f.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    files.forEach(file => {
      if (file.preview) URL.revokeObjectURL(file.preview);
    });
    setFiles([]);
  }, [files]);

  const updateFile = useCallback((id: string, updates: Partial<ConvertedImage>) => {
    setFiles(prev => prev.map(file => 
      file.id === id ? { ...file, ...updates } : file
    ));
  }, []);

  const toggleFileSelection = useCallback((id: string) => {
    setFiles(prev => prev.map(file => {
      if (file.id === id && 'selectedForBatch' in file) {
        return { ...file, selectedForBatch: !file.selectedForBatch };
      }
      return file;
    }));
  }, []);

  const selectAllFiles = useCallback(() => {
    setFiles(prev => prev.map(file => ({
      ...file,
      selectedForBatch: 'convertedBlob' in file ? true : false
    })));
  }, []);

  const deselectAllFiles = useCallback(() => {
    setFiles(prev => prev.map(file => ({
      ...file,
      selectedForBatch: false
    })));
  }, []);

  return {
    files,
    isProcessing,
    setIsProcessing,
    fileInputRef,
    addFiles,
    removeFile,
    clearAll,
    updateFile,
    toggleFileSelection,
    selectAllFiles,
    deselectAllFiles
  };
};