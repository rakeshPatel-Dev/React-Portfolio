export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${units[i]}`;
};

export const getFileExtension = (filename: string): string => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

export const removeFileExtension = (filename: string): string => {
  return filename.replace(/\.[^/.]+$/, '');
};

export const generateFileName = (originalName: string, newFormat: string): string => {
  const baseName = removeFileExtension(originalName);
  const timestamp = Date.now();
  return `${baseName}_converted_${timestamp}.${newFormat.toLowerCase()}`;
};

export const isImageFile = (file: File): boolean => {
  return file.type.startsWith('image/');
};

export const validateImageFile = (file: File, maxSize: number = 50 * 1024 * 1024): string | null => {
  if (!isImageFile(file)) {
    return 'File is not an image';
  }
  
  if (file.size > maxSize) {
    return `File size exceeds ${formatFileSize(maxSize)}`;
  }
  
  return null;
};