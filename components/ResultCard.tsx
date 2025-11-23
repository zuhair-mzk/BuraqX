import { Listing } from '@/lib/models';
import CategoryBadge from './CategoryBadge';

interface ResultCardProps {
  listing: Listing;
}

export default function ResultCard({ listing }: ResultCardProps) {
  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-base font-semibold text-white">
          {listing.title}
        </h3>
        {listing.isFeatured && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400">
            ⭐
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-400 text-xs mb-3 line-clamp-2 leading-relaxed">
        {listing.description}
      </p>

      {/* Metadata */}
      <div className="space-y-1.5 mb-3">
        {/* Location */}
        <div className="flex items-center text-xs text-gray-500">
          <span className="mr-1.5">📍</span>
          <span>{listing.locationText}</span>
        </div>

        {/* Pricing */}
        {listing.pricing && (
          <div className="flex items-center text-xs text-gray-500">
            <span className="mr-1.5">💰</span>
            <span className="font-medium">
              {listing.pricing.min && listing.pricing.max
                ? `$${listing.pricing.min}-$${listing.pricing.max}`
                : listing.pricing.min
                ? `From $${listing.pricing.min}`
                : `Up to $${listing.pricing.max}`}
              {' '}
              {listing.pricing.currency}
              {listing.pricing.unit && ` / ${listing.pricing.unit}`}
            </span>
          </div>
        )}

        {/* Experience */}
        {listing.yearsOfExperience && (
          <div className="flex items-center text-xs text-gray-500">
            <span className="mr-1.5">⏱️</span>
            <span>{listing.yearsOfExperience} years exp</span>
          </div>
        )}

        {/* Response Time */}
        {listing.responseTime && (
          <div className="flex items-center text-xs text-gray-500">
            <span className="mr-1.5">⚡</span>
            <span>{listing.responseTime}</span>
          </div>
        )}

        {/* Community Endorsements */}
        {listing.communityEndorsements > 0 && (
          <div className="flex items-center text-xs text-gray-400 font-medium">
            <span className="mr-1.5">⭐</span>
            <span>{listing.communityEndorsements} endorsements</span>
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <CategoryBadge categoryId={listing.categoryId} />
        {listing.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-800 text-gray-400"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Action Button */}
      <button className="w-full py-2 bg-white hover:bg-gray-200 text-black rounded-lg text-xs font-medium transition-all duration-200">
        Contact
      </button>
    </div>
  );
}
