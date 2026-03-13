import { Download, Upload, X, FileUp, Archive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
// import { Separator } from '@/components/ui/separator';

interface ActionButtonsProps {
  onConvert: () => void;
  onDownload: () => void;
  onClear: () => void;
  onAddMore: () => void;
  isConverting: boolean;
  hasFiles: boolean;
  hasConverted: boolean;
  hasSelected: boolean;
  progress: number;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onConvert,
  onDownload,
  onClear,
  onAddMore,
  isConverting,
  hasFiles,
  hasConverted,
  hasSelected,
  progress
}) => {
  return (
    <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4 z-50">
      <div className="bg-background rounded-lg shadow-lg border p-4">
        {/* Progress Bar */}
        {isConverting && (
          <div className="mb-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Converting...</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button
            variant="outline"
            size="default"
            onClick={onAddMore}
            disabled={isConverting}
            className="gap-2"
          >
            <FileUp className="h-4 w-4" />
            <span className="hidden sm:inline">Add More</span>
          </Button>

          <Button
            variant="default"
            size="default"
            onClick={onConvert}
            disabled={!hasFiles || isConverting}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            <span>
              {isConverting ? 'Converting...' : hasConverted ? 'Reconvert All' : 'Convert All'}
            </span>
          </Button>

          {hasConverted && (
            <Button
              variant="secondary"
              size="default"
              onClick={onDownload}
              disabled={!hasSelected || isConverting}
              className="gap-2"
            >
              <Archive className="h-4 w-4" />
              <span className="hidden sm:inline">Download Selected</span>
            </Button>
          )}

          {hasFiles && (
            <Button
              variant="ghost"
              size="default"
              onClick={onClear}
              disabled={isConverting}
              className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <X className="h-4 w-4" />
              <span className="hidden sm:inline">Clear All</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};