'use client';

import { useState, useCallback, useEffect } from 'react';
import { useFileManager } from '@/hooks/useFileManager';
import { ConversionService } from '@/services/conversion.service';
import { DownloadService } from '@/services/download.service';
import { ImageProcessor } from '@/services/image-processor.service';
import toast from 'react-hot-toast';
import type {
  ImageFormat,
  ConversionOptions,
  ConvertedImage
} from '@/types/image-converter.types';

// UI Components
import { UploadZone } from '../converter/UploadZone';
import { FormatSelector } from '../converter/FormatSelector';
import { QualityControl } from '../converter/QualityControl';
import { FileList } from '../converter/FileList';
import { ActionButtons } from '../converter/ActionButtons';
import { ConversionStats } from '../converter/ConversionStats';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DEFAULT_OPTIONS: ConversionOptions = {
  targetFormat: 'JPG',
  quality: 85,
  maxDimension: 3840,
  maintainAspectRatio: true
};

export const ImageConverter: React.FC = () => {
  const {
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
  } = useFileManager();

  const [options, setOptions] = useState<ConversionOptions>(DEFAULT_OPTIONS);
  const [progress, setProgress] = useState(0);
  const [stats, setStats] = useState({
    totalOriginalSize: 0,
    totalConvertedSize: 0,
    totalSaved: 0
  });

  // Update stats when files change
  useEffect(() => {
    const convertedFiles = files.filter(f => 'convertedBlob' in f) as ConvertedImage[];

    const totalOriginalSize = convertedFiles.reduce((acc, f) => acc + f.size, 0);
    const totalConvertedSize = convertedFiles.reduce((acc, f) => acc + (f.newSize || 0), 0);

    setStats({
      totalOriginalSize,
      totalConvertedSize,
      totalSaved: totalOriginalSize - totalConvertedSize
    });
  }, [files]);

  const handleConvert = useCallback(async () => {
    if (files.length === 0) {
      toast.error('Please upload files to convert');
      return;
    }

    const unconvertedFiles = files.filter(f => !('convertedBlob' in f));

    if (unconvertedFiles.length === 0) {
      toast.success('All files are already converted');
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      const converted = await ConversionService.convertFiles(
        unconvertedFiles,
        options,
        setProgress
      );

      // Update files with converted versions
      converted.forEach(file => {
        updateFile(file.id, file);
      });

      toast.success(`Successfully converted ${converted.length} file(s)`);
    } catch (error) {
      toast.error('Conversion failed. Please try again.');
      console.error('Conversion error:', error);
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  }, [files, options, setIsProcessing, updateFile]);

  const handleDownloadSelected = useCallback(async () => {
    const selectedFiles = files.filter(
      f => 'selectedForBatch' in f && f.selectedForBatch && 'convertedBlob' in f
    ) as ConvertedImage[];

    if (selectedFiles.length === 0) {
      toast.error('No converted files selected');
      return;
    }

    try {
      if (selectedFiles.length === 1) {
        await DownloadService.downloadSingleImage(selectedFiles[0]);
        toast.success('File downloaded');
      } else {
        await DownloadService.downloadAsZip(selectedFiles);
        toast.success('ZIP archive downloaded');
      }
    } catch (error) {
      toast.error('Download failed');
      console.error('Download error:', error);
    }
  }, [files]);

  const handleFormatChange = useCallback((format: ImageFormat) => {
    setOptions(prev => ({ ...prev, targetFormat: format }));
  }, []);

  const handleQualityChange = useCallback((quality: number) => {
    setOptions(prev => ({ ...prev, quality }));
  }, []);

  const hasConvertedFiles = files.some(f => 'convertedBlob' in f);
  const qualityApplicable = ImageProcessor.qualityApplicable(options.targetFormat);

  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Header Section */}
        <div className=' flex items-center justify-between'>
          <div className="text-left mb-12 space-y-4">
            <h1 className="text-5xl heading-bold md:text-6xl font-bold tracking-tight">
              Image Converter
            </h1>
            <p className="text-lg heading-normal text-muted-foreground max-w-2xl">
              Transform your images with premium quality. Drag and drop or browse to get started.
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </div>

        {/* Stats Overview */}
        {hasConvertedFiles && <ConversionStats stats={stats} />}

        {/* Upload Zone */}
        <UploadZone
          onFilesAccepted={addFiles}
          fileInputRef={fileInputRef}
          isProcessing={isProcessing}
          fileCount={files.length}
        />

        {/* Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <FormatSelector
              selectedFormat={options.targetFormat}
              onFormatChange={handleFormatChange}
              disabled={isProcessing}
            />
          </div>
          <div>
            <QualityControl
              quality={options.quality}
              onQualityChange={handleQualityChange}
              disabled={!qualityApplicable || isProcessing}
              showQuality={qualityApplicable}
            />
          </div>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <FileList
            files={files}
            onRemove={removeFile}
            onToggleSelect={toggleFileSelection}
            onSelectAll={selectAllFiles}
            onDeselectAll={deselectAllFiles}
            isProcessing={isProcessing}
          />
        )}

        {/* Action Buttons */}
        <ActionButtons
          onConvert={handleConvert}
          onDownload={handleDownloadSelected}
          onClear={clearAll}
          onAddMore={() => fileInputRef.current?.click()}
          isConverting={isProcessing}
          hasFiles={files.length > 0}
          hasConverted={hasConvertedFiles}
          hasSelected={files.some(f => 'selectedForBatch' in f && f.selectedForBatch)}
          progress={progress}
        />
      </div>
    </main>
  );
};

export default ImageConverter;