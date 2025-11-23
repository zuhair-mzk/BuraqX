import { Listing } from '@/lib/models';
import Link from 'next/link';

interface ResultCardProps {
  listing: Listing;
}

export default function ResultCard({ listing }: ResultCardProps) {
  return (
    <Link href={`/provider/${listing.id}`}>
      <div className="group p-7 border border-zinc-900/20 hover:border-zinc-800/40 rounded-2xl transition-all duration-700 cursor-pointer hover:bg-zinc-950/30 backdrop-blur-sm hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/30 active:scale-[1.01]">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex-1">
            <h3 className="text-base font-extralight text-white/95 mb-2 group-hover:text-white transition-all duration-700 tracking-wide group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
              {listing.title}
            </h3>
            <p className="text-[11px] text-zinc-600 font-extralight tracking-wider uppercase">
              {listing.locationText}
            </p>
          </div>
          {listing.isFeatured && (
            <span className="text-[11px] text-zinc-900 font-extralight ml-2 flex-shrink-0">★</span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-zinc-500 font-extralight mb-6 line-clamp-2 leading-loose">
          {listing.description}
        </p>

        {/* Metadata - Minimal */}
        <div className="flex items-center justify-between text-[11px] text-zinc-600 font-extralight mb-6">
          <div className="flex items-center gap-3 tracking-wider">
            {listing.yearsOfExperience && (
              <span>{listing.yearsOfExperience}y exp</span>
            )}
            {listing.responseTime && (
              <span className="opacity-40">·</span>
            )}
            {listing.responseTime && (
              <span>{listing.responseTime}</span>
            )}
          </div>
          
          {listing.pricing && (
            <div className="text-white/90 font-extralight tracking-wider">
              {listing.pricing.min && listing.pricing.max
                ? `$${listing.pricing.min}-${listing.pricing.max}`
                : listing.pricing.min
                ? `$${listing.pricing.min}`
                : `$${listing.pricing.max}`}
            </div>
          )}
        </div>

        {/* Tags - Simplified */}
        {listing.tags.length > 0 && (
          <div className="flex flex-wrap gap-4 mb-6">
            {listing.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] text-zinc-700 font-extralight tracking-widest uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Text */}
        <div className="text-[11px] text-zinc-600 group-hover:text-zinc-400 transition-all duration-700 font-extralight flex items-center tracking-[0.15em] uppercase">
          View details
          <svg className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform duration-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
