import { useTranslations } from 'next-intl';
import { CheckCircle, Clock, Package, Truck, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { OrderStatus } from '@/types/database';

interface Props {
  status: OrderStatus;
}

const STEPS: { key: OrderStatus; icon: React.ElementType }[] = [
  { key: 'pending', icon: Clock },
  { key: 'confirmed', icon: CheckCircle },
  { key: 'shipped', icon: Truck },
  { key: 'delivered', icon: Home },
];

const ORDER_INDEX: Record<OrderStatus, number> = {
  pending: 0,
  confirmed: 1,
  shipped: 2,
  delivered: 3,
  cancelled: -1,
};

export default function OrderStatusTimeline({ status }: Props) {
  const t = useTranslations('order.status');
  const currentIndex = ORDER_INDEX[status];

  if (status === 'cancelled') {
    return (
      <div className="flex items-center gap-2 text-red-500 bg-red-50 rounded-xl px-4 py-3">
        <Package size={18} />
        <span className="font-medium">{t('cancelled')}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {STEPS.map((step, index) => {
        const Icon = step.icon;
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div key={step.key} className="flex items-center gap-1 sm:gap-2">
            <div className="flex flex-col items-center gap-1">
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center transition-colors',
                isCompleted && 'bg-brand-orange text-white',
                isCurrent && 'bg-brand-orange/20 text-brand-orange ring-2 ring-brand-orange',
                !isCompleted && !isCurrent && 'bg-brand-cream-dark text-brand-navy/30',
              )}>
                <Icon size={16} strokeWidth={2} />
              </div>
              <span className={cn(
                'text-[10px] text-center hidden sm:block',
                isCurrent && 'text-brand-orange font-semibold',
                isCompleted && 'text-brand-navy/50',
                !isCompleted && !isCurrent && 'text-brand-navy/30',
              )}>
                {t(step.key as any)}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div className={cn(
                'h-0.5 flex-1 min-w-[16px] sm:min-w-[24px] rounded-full mb-5',
                index < currentIndex ? 'bg-brand-orange' : 'bg-brand-cream-dark',
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}
