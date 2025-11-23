import { V1_CATEGORIES } from '@/lib/models';

interface CategoryBadgeProps {
  categoryId: string;
  size?: 'sm' | 'md';
}

export default function CategoryBadge({ categoryId, size = 'sm' }: CategoryBadgeProps) {
  const category = V1_CATEGORIES.find((cat) => cat.id === categoryId);

  if (!category) return null;

  const colorMap: Record<string, string> = {
    tutoring: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    freelance: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
    home_service: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    event: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
    wedding: 'bg-pink-500/10 border-pink-500/20 text-pink-400',
  };

  const sizeClass = size === 'sm' ? 'text-xs px-2.5 py-1' : 'text-sm px-3 py-1.5';

  return (
    <span
      className={`inline-flex items-center rounded-lg font-semibold border ${colorMap[category.type]} ${sizeClass}`}
    >
      {category.label}
    </span>
  );
}
