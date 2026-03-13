import { HardDrive, Download, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ConversionStatsProps {
  stats: {
    totalOriginalSize: number;
    totalConvertedSize: number;
    totalSaved: number;
  };
}

export const ConversionStats: React.FC<ConversionStatsProps> = ({ stats }) => {
  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const savingsPercentage = stats.totalOriginalSize > 0
    ? ((stats.totalSaved / stats.totalOriginalSize) * 100).toFixed(1)
    : '0';

  const cards = [
    {
      title: 'Original Size',
      value: formatSize(stats.totalOriginalSize),
      icon: HardDrive,
    },
    {
      title: 'Converted Size',
      value: formatSize(stats.totalConvertedSize),
      icon: Download,
    },
    {
      title: 'Space Saved',
      value: formatSize(stats.totalSaved),
      subValue: `(${savingsPercentage}%)`,
      icon: TrendingDown,
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card key={card.title}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {card.title}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-foreground">
                      {card.value}
                    </span>
                    {card.subValue && (
                      <span className="text-sm font-medium text-muted-foreground">
                        {card.subValue}
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};