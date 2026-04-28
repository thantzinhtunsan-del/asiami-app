import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency = 'JPY'): string {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export const COMMUNITY_BADGES = [
  { id: 'b1000000-0000-0000-0000-000000000001', name: 'Myanmar-owned', flag: '🇲🇲', color: '#E8622A' },
  { id: 'b1000000-0000-0000-0000-000000000002', name: 'Vietnamese-owned', flag: '🇻🇳', color: '#DA251D' },
  { id: 'b1000000-0000-0000-0000-000000000003', name: 'Nepali-owned', flag: '🇳🇵', color: '#003893' },
  { id: 'b1000000-0000-0000-0000-000000000004', name: 'Chinese-owned', flag: '🇨🇳', color: '#DE2910' },
  { id: 'b1000000-0000-0000-0000-000000000005', name: 'Thai-owned', flag: '🇹🇭', color: '#A51931' },
  { id: 'b1000000-0000-0000-0000-000000000006', name: 'Indonesian-owned', flag: '🇮🇩', color: '#CE1126' },
  { id: 'b1000000-0000-0000-0000-000000000007', name: 'Filipino-owned', flag: '🇵🇭', color: '#0038A8' },
] as const;

export const CATEGORIES = [
  { id: 'food_grocery', icon: '🥘', labelKey: 'food_grocery' },
  { id: 'snacks', icon: '🍡', labelKey: 'snacks' },
  { id: 'cultural_items', icon: '🏮', labelKey: 'cultural_items' },
  { id: 'restaurant', icon: '🍜', labelKey: 'restaurant' },
  { id: 'fashion', icon: '👘', labelKey: 'fashion' },
  { id: 'beauty', icon: '💄', labelKey: 'beauty' },
] as const;

export const PLACEHOLDER_IMAGES = {
  product: 'https://picsum.photos/400/400',
  seller: 'https://picsum.photos/200/200',
  banner: 'https://picsum.photos/1200/400',
};

export function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}
