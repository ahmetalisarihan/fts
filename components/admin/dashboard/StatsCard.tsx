'use client';

import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<any>;
  trend?: string;
  trendUp?: boolean;
  description?: string;
  className?: string;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  description,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        'bg-card rounded-lg border border-border p-6 shadow-sm hover:shadow-md transition-shadow',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
          </div>
        </div>
      </div>

      {description && (
        <div className="mt-4">
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      )}
      
      {trend && (
        <div className="mt-4 flex items-center justify-end">
          <div
            className={cn(
              'flex items-center space-x-1 text-xs font-medium',
              trendUp ? 'text-green-600' : 'text-red-600'
            )}
          >
            {trendUp ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>{trend}</span>
          </div>
        </div>
      )}
    </div>
  );
}
