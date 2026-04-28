import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  flagEmoji: string;
  name: string;
  verified?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function CommunityBadge({ flagEmoji, name, verified = true, size = 'md', className }: Props) {
  const sizes = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-sm px-2.5 py-1 gap-1.5',
    lg: 'text-base px-3 py-1.5 gap-2',
  };

  return (
    <span className={cn(
      'inline-flex items-center rounded-full bg-brand-cream border border-brand-cream-dark font-medium text-brand-navy',
      sizes[size],
      className
    )}>
      <span className={size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg'}>
        {flagEmoji}
      </span>
      <span>{name}</span>
      {verified && (
        <CheckCircle
          size={size === 'sm' ? 12 : size === 'md' ? 14 : 16}
          className="text-brand-orange flex-shrink-0"
          strokeWidth={2.5}
        />
      )}
    </span>
  );
}
