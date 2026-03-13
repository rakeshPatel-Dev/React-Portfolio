import { Upload, FileUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface UploadZoneProps {
  onFilesAccepted: (files: FileList) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  isProcessing: boolean;
  fileCount: number;
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  onFilesAccepted,
  fileInputRef,
  isProcessing,
  fileCount
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files.length > 0) {
      onFilesAccepted(e.dataTransfer.files);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div
        onClick={() => !isProcessing && fileInputRef.current?.click()}
        onKeyDown={(e) => {
          if (!isProcessing && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="button"
        tabIndex={isProcessing ? -1 : 0}
        aria-label="Upload images"
        className={`
          relative overflow-hidden rounded-2xl border-2 border-dashed 
          transition-all duration-300 cursor-pointer
          ${isDragging
            ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/20 scale-105'
            : 'border-gray-300 dark:border-gray-700 hover:border-orange-400 dark:hover:border-orange-600'
          }
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}
        `}
      >
        <div className="flex flex-col items-center justify-center p-12">
          <motion.div
            animate={isDragging ? { scale: 1.1, rotate: 10 } : { scale: 1, rotate: 0 }}
            className="mb-4"
          >
            {isDragging ? (
              <FileUp className="w-16 h-16 text-orange-500" />
            ) : (
              <Upload className="w-16 h-16 text-gray-400" />
            )}
          </motion.div>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {isDragging ? 'Drop to upload' : 'Drag & drop your images'}
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
            or <span className="text-orange-500 font-semibold">browse</span> to select files
          </p>

          <AnimatePresence>
            {fileCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4"
              >
                <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                  {fileCount} file{fileCount !== 1 ? 's' : ''} uploaded
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <input
        title='dropzone'
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={(e) => e.target.files && onFilesAccepted(e.target.files)}
        multiple
        accept="image/jpeg,image/png,image/webp,image/gif,image/bmp"
        disabled={isProcessing}
      />
    </motion.div>
  );
};