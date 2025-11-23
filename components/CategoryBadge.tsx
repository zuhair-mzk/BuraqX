import { V1_CATEGORIES } from '@/lib/models';

interface CategoryBadgeProps {
  categoryId: string;
  size?: 'sm' | 'md';
}

export default function CategoryBadge({ categoryId, size = 'sm' }: CategoryBadgeProps) {
  const category = V1_CATEGORIES.find((cat) => cat.id === categoryId);

  if (!category) return null;

  const colorMap: Record<string, string> = {
    tutoring: 'bg-blue-100 text-blue-800',
    freelance: 'bg-purple-100 text-purple-800',
    home_service: 'bg-green-100 text-green-800',
    event: 'bg-orange-100 text-orange-800',
    wedding: 'bg-pink-100 text-pink-800',
  };

  const sizeClass = size === 'sm' ? 'text-xs px-2.5 py-0.5' : 'text-sm px-3 py-1';

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${colorMap[category.type]} ${sizeClass}`}
    >
      {category.label}
    </span>
  );
}
