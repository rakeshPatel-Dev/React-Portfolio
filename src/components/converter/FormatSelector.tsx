import type { ImageFormat } from '@/types/image-converter.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormatSelectorProps {
  selectedFormat: ImageFormat;
  onFormatChange: (format: ImageFormat) => void;
  disabled?: boolean;
}

const formats: { value: ImageFormat; label: string; description: string }[] = [
  { value: 'JPG', label: 'JPEG', description: 'Best for photos' },
  { value: 'PNG', label: 'PNG', description: 'Lossless, transparency' },
  { value: 'WEBP', label: 'WebP', description: 'Modern, small size' },
  { value: 'GIF', label: 'GIF', description: 'Animation support' },
  { value: 'BMP', label: 'BMP', description: 'Uncompressed' }
];

export const FormatSelector: React.FC<FormatSelectorProps> = ({
  selectedFormat,
  onFormatChange,
  disabled = false
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Output Format</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {formats.map((format) => {
            const isSelected = selectedFormat === format.value;

            return (
              <button
                type='button'
                key={format.value}
                onClick={() => !disabled && onFormatChange(format.value)}
                disabled={disabled}
                className={cn(
                  "relative p-4 rounded-lg border text-left transition-all",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-input",
                  disabled && "opacity-50 cursor-not-allowed pointer-events-none"
                )}
              >
                {isSelected && (
                  <Badge
                    variant="default"
                    className="absolute top-2 right-2 h-5 w-5 p-0 flex items-center justify-center"
                  >
                    <Check className="h-3 w-3" />
                  </Badge>
                )}

                <div className="space-y-1">
                  <span className="block text-lg font-semibold">
                    {format.value}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {format.description}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};