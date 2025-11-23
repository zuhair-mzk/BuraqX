import { Listing } from '@/lib/models';
import Link from 'next/link';

interface ResultCardProps {
  listing: Listing;
}

export default function ResultCard({ listing }: ResultCardProps) {
  return (
    <Link href={`/provider/${listing.id}`}>
      <div className="group p-5 bg-[#111113] hover:bg-[#18181B] border border-gray-900 hover:border-gray-800 rounded-xl transition-colors cursor-pointer">
        
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-[15px] font-medium text-white mb-1">
              {listing.title}
            </h3>
            <p className="text-[13px] text-gray-500">
              {listing.locationText}
            </p>
          </div>
          {listing.isFeatured && (
            <span className="flex-shrink-0 ml-3 px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[11px] text-gray-400">
              Featured
            </span>
          )}
        </div>

        <p className="text-[13px] text-gray-400 mb-4 line-clamp-2 leading-relaxed">
          {listing.description}
        </p>

        <div className="flex items-center justify-between text-[12px] mb-4 pb-4 border-b border-gray-900">
          <div className="flex items-center gap-3 text-gray-600">
            {listing.yearsOfExperience && (
              <span>{listing.yearsOfExperience}y exp</span>
            )}
            {listing.responseTime && (
              <span>• {listing.responseTime}</span>
            )}
          </div>
          
          {listing.pricing && (
            <div className="text-[13px] text-white font-medium">
              {listing.pricing.min && listing.pricing.max
                ? `$${listing.pricing.min}-${listing.pricing.max}`
                : listing.pricing.min
                ? `From $${listing.pricing.min}`
                : `Up to $${listing.pricing.max}`}
            </div>
          )}
        </div>

        {listing.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {listing.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-[#0A0A0B] border border-gray-900 rounded text-[11px] text-gray-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
