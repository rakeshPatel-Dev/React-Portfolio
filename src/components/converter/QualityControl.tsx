import { Settings, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

interface QualityControlProps {
  quality: number;
  onQualityChange: (quality: number) => void;
  disabled?: boolean;
  showQuality: boolean;
}

export const QualityControl: React.FC<QualityControlProps> = ({
  quality,
  onQualityChange,
  disabled = false,
  showQuality
}) => {
  const getQualityBadge = (value: number) => {
    if (value >= 90) return { label: 'Best Quality', variant: 'default' as const };
    if (value >= 70) return { label: 'High Quality', variant: 'default' as const };
    if (value >= 50) return { label: 'Balanced', variant: 'secondary' as const };
    if (value >= 30) return { label: 'Smaller File', variant: 'outline' as const };
    return { label: 'Minimum Size', variant: 'outline' as const };
  };

  const badge = getQualityBadge(quality);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Quality Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        {showQuality ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Label htmlFor="quality">Compression Level</Label>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{quality}%</span>
                <Badge variant={badge.variant}>{badge.label}</Badge>
              </div>
            </div>

            <Slider
              id="quality"
              min={1}
              max={100}
              step={1}
              value={[quality]}
              onValueChange={(value) => onQualityChange(value[0])}
              disabled={disabled}
              className="w-full"
            />

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Smaller</span>
              <span>Balanced</span>
              <span>Better</span>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Higher quality = larger file size. Adjust based on your needs.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <div className="flex items-center justify-center h-32">
            <p className="text-sm text-muted-foreground text-center">
              Quality settings not available<br />
              for this format
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};