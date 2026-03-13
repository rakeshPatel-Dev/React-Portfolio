import type { ImageFile, ConvertedImage } from '@/types/image-converter.types';
import { X, Download, Image as ImageIcon, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { formatFileSize } from '@/utils/file-utils';

interface FileCardProps {
  file: ImageFile | ConvertedImage;
  onRemove: (id: string) => void;
  onToggleSelect: (id: string) => void;
  isProcessing: boolean;
}

export const FileCard: React.FC<FileCardProps> = ({
  file,
  onRemove,
  onToggleSelect,
  isProcessing
}) => {
  const isConverted = 'convertedBlob' in file;
  const isSelected = isConverted && file.selectedForBatch;

  const getFileIcon = () => {
    if (file.type.includes('image')) return <ImageIcon className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isConverted && file.convertedBlob) {
      // Download logic here
      const url = URL.createObjectURL(file.convertedBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.convertedName ?? file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <Card
      className={cn(
        "relative transition-colors",
        isSelected && "border-primary bg-primary/5",
        isConverted && !isProcessing && "cursor-pointer hover:bg-accent/50"
      )}
      onClick={() => isConverted && !isProcessing && onToggleSelect(file.id)}
    >
      <div className="flex items-start gap-4 p-4">
        {/* Preview Image */}
        <div className="relative h-16 w-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
          {file.preview ? (
            <img
              src={file.preview}
              alt={file.name}
              className="h-full w-full object-cover"
              draggable={false}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              {getFileIcon()}
            </div>
          )}
        </div>

        {/* File Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1">
              <h4 className="font-medium text-sm truncate max-w-[200px] md:max-w-[300px]">
                {file.name}
              </h4>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(file.size)}
              </p>
            </div>

            <div className="flex items-center gap-1">
              {isConverted && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleDownload}
                  title="Download"
                >
                  <Download className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(file.id);
                }}
                disabled={isProcessing}
                title="Remove"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Conversion Details */}
          {isConverted && (
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {file.convertedType}
              </Badge>

              {file.compressionRatio !== undefined && (
                <Badge
                  variant={file.compressionRatio > 0 ? "default" : "outline"}
                  className="text-xs"
                >
                  {file.compressionRatio > 0 ? '-' : '+'}
                  {Math.abs(file.compressionRatio)}%
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Selection Checkbox */}
        {isConverted && (
          <Checkbox
            checked={isSelected}
            className="absolute top-4 right-4"
            onClick={(e) => e.stopPropagation()}
            onCheckedChange={() => onToggleSelect(file.id)}
          />
        )}
      </div>
    </Card>
  );
};