import type { ImageFile, ConvertedImage } from '@/types/image-converter.types';
import { FileCard } from './FileCard';
import { CheckSquare, Square } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface FileListProps {
  files: (ImageFile | ConvertedImage)[];
  onRemove: (id: string) => void;
  onToggleSelect: (id: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  isProcessing: boolean;
}

export const FileList: React.FC<FileListProps> = ({
  files,
  onRemove,
  onToggleSelect,
  onSelectAll,
  onDeselectAll,
  isProcessing
}) => {
  const hasConvertedFiles = files.some(f => 'convertedBlob' in f);
  const selectedCount = files.filter(f => 'selectedForBatch' in f && f.selectedForBatch).length;
  const convertibleCount = files.filter(f => 'convertedBlob' in f).length;
  const allSelected = selectedCount === convertibleCount && convertibleCount > 0;

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-3">
          <CardTitle className="text-base font-medium">Image Queue</CardTitle>
          <Badge variant="secondary">
            {files.length} {files.length === 1 ? 'file' : 'files'}
          </Badge>
        </div>

        {hasConvertedFiles && (
          <Button
            variant="ghost"
            size="sm"
            onClick={allSelected ? onDeselectAll : onSelectAll}
            disabled={isProcessing}
            className="gap-2"
          >
            {allSelected ? (
              <CheckSquare className="h-4 w-4" />
            ) : (
              <Square className="h-4 w-4" />
            )}
            {allSelected ? 'Deselect All' : 'Select All'}
          </Button>
        )}
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {files.map((file) => (
              <FileCard
                key={file.id}
                file={file}
                onRemove={onRemove}
                onToggleSelect={onToggleSelect}
                isProcessing={isProcessing}
              />
            ))}
          </div>
        </ScrollArea>

        {hasConvertedFiles && selectedCount > 0 && (
          <>
            <Separator className="my-4" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {selectedCount} file{selectedCount !== 1 ? 's' : ''} selected
              </span>
              <Badge variant="outline" className="bg-primary/5">
                Ready for download
              </Badge>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};