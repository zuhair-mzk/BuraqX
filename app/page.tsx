'use client';

import { useState, FormEvent, useMemo } from 'react';
import { useRouter } from 'next/navigation';

const quranVerses = [
  { text: "And cooperate in righteousness and piety", reference: "Surah Al-Ma'idah, 5:2" },
  { text: "Indeed, Allah is with those who are patient", reference: "Surah Al-Baqarah, 2:153" },
  { text: "Verily, with hardship comes ease", reference: "Surah Ash-Sharh, 94:6" },
  { text: "And whoever puts their trust in Allah, He will be sufficient for them", reference: "Surah At-Talaq, 65:3" },
  { text: "So remember Me; I will remember you", reference: "Surah Al-Baqarah, 2:152" },
  { text: "Allah does not burden a soul beyond that it can bear", reference: "Surah Al-Baqarah, 2:286" },
  { text: "And He is with you wherever you are", reference: "Surah Al-Hadid, 57:4" },
];

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Get daily verse based on day of year
  const dailyVerse = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return quranVerses[dayOfYear % quranVerses.length];
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isTransitioning) {
      setIsTransitioning(true);
      // Store the query in sessionStorage for the chat page
      sessionStorage.setItem('morphQuery', query.trim());
      // Smooth navigation timing
      setTimeout(() => {
        router.push(`/chat?q=${encodeURIComponent(query.trim())}`);
      }, 500);
    }
  };

  const row1Queries = [
    'Need help with calculus homework',
    'Looking for a wedding photographer in Mississauga',
    'Want to learn Arabic for beginners',
    'Anyone know a good personal trainer?',
    'Need someone to design my business logo',
    'Electrical panel keeps tripping, help',
    'My AC died in this heat 😭',
    'Best biryani catering in Scarborough?',
  ];

  const row2Queries = [
    'Kitchen sink is leaking badly',
    'Best Quran teacher for my 7 year old?',
    'Need deep cleaning for my apartment',
    'Car making weird noise when I brake',
    'Looking for affordable family photographer',
    'Math tutor for grade 11 student',
    'Help! Wedding is in 2 weeks, need a henna artist',
    'Recommendations for a good dentist?',
  ];

  const row3Queries = [
    'Need a website built for my small business',
    'Are there any sisters halaqa events this weekend?',
    'Bathroom tiles need fixing',
    'Help redesigning my living room',
    'Catering for 50 people for walima',
    'Planning a birthday party, need event planner',
    'Does anyone teach kids swimming lessons?',
    'Garage door won\'t close properly',
  ];

  const row4Queries = [
    'Looking for a reliable handyman',
    'Who can fix my laptop screen?',
    'Need a French tutor for my daughter',
    'Landscaping help for backyard makeover',
    'Personal chef for meal prep?',
    'Best place for car detailing in Brampton',
    'Electrician for smart home installation',
    'Any good tailors for alterations nearby?',
  ];

  const row5Queries = [
    'Piano lessons for adults, any recommendations?',
    'Furnace making strange noises',
    'Need someone to help move furniture',
    'Looking for Islamic calligraphy artist',
    'Help with tax filing for small business',
    'Anyone teach Quran recitation online?',
    'Need a plumber ASAP, basement flooding!',
    'Sound system installation for masjid',
  ];

  const row6Queries = [
    'Graphic designer for social media content',
    'Roof repair after the storm',
    'Voice coach for singing lessons?',
    'Need help installing home theatre system',
    'Personal organizer to declutter my house',
    'Best barber for kids haircuts',
    'Yoga instructor for private sessions',
    'Where can I find a good accountant?',
  ];

  return (
    <div className="min-h-screen flex flex-col px-4 bg-gradient-to-br from-[#0a0a0a] via-[#151515] to-[#0f0f0f] relative overflow-hidden">
      
      {/* Continuous scroll rows with logo in center */}
      <div className={`absolute top-32 left-0 right-0 pointer-events-none transition-all duration-700 ease-in-out ${isTransitioning ? 'opacity-0 blur-2xl scale-105' : 'opacity-20'}`} style={{ filter: 'blur(0.8px)' }}>
        <div className="flex flex-col gap-3.5">
          {/* Row 1 */}
          <div className="flex animate-scroll-right">
            {row1Queries.concat(row1Queries).concat(row1Queries).concat(row1Queries).map((text, i) => (
              <span key={`bg1-${i}`} className="flex-shrink-0 mx-2 px-4 py-2.5 bg-zinc-800/40 rounded-xl text-sm text-gray-400 whitespace-nowrap">
                {text}
              </span>
            ))}
          </div>
          {/* Row 2 */}
          <div className="flex animate-scroll-left">
            {row2Queries.concat(row2Queries).concat(row2Queries).concat(row2Queries).map((text, i) => (
              <span key={`bg2-${i}`} className="flex-shrink-0 mx-2 px-4 py-2.5 bg-zinc-800/40 rounded-xl text-sm text-gray-400 whitespace-nowrap">
                {text}
              </span>
            ))}
          </div>
          {/* Row 3 */}
          <div className="flex animate-scroll-right">
            {row3Queries.concat(row3Queries).concat(row3Queries).concat(row3Queries).map((text, i) => (
              <span key={`bg3-${i}`} className="flex-shrink-0 mx-2 px-4 py-2.5 bg-zinc-800/40 rounded-xl text-sm text-gray-400 whitespace-nowrap">
                {text}
              </span>
            ))}
          </div>
          {/* Row 4 */}
          <div className="flex animate-scroll-left">
            {row4Queries.concat(row4Queries).concat(row4Queries).concat(row4Queries).map((text, i) => (
              <span key={`bg4-${i}`} className="flex-shrink-0 mx-2 px-4 py-2.5 bg-zinc-800/40 rounded-xl text-sm text-gray-400 whitespace-nowrap">
                {text}
              </span>
            ))}
          </div>
          {/* Row 5 */}
          <div className="flex animate-scroll-right">
            {row5Queries.concat(row5Queries).concat(row5Queries).concat(row5Queries).map((text, i) => (
              <span key={`bg5-${i}`} className="flex-shrink-0 mx-2 px-4 py-2.5 bg-zinc-800/40 rounded-xl text-sm text-gray-400 whitespace-nowrap">
                {text}
              </span>
            ))}
          </div>
          {/* Row 6 */}
          <div className="flex animate-scroll-left">
            {row6Queries.concat(row6Queries).concat(row6Queries).concat(row6Queries).map((text, i) => (
              <span key={`bg6-${i}`} className="flex-shrink-0 mx-2 px-4 py-2.5 bg-zinc-800/40 rounded-xl text-sm text-gray-400 whitespace-nowrap">
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Logo - Overlaying in center of scroll rows */}
      <div className={`relative z-10 w-full max-w-5xl mx-auto text-center pt-48 transition-all duration-700 ease-in-out ${isTransitioning ? 'opacity-0 -translate-y-[70vh] scale-75' : ''}`}>
        <div className="flex justify-center mb-28">
          <div className="relative w-24 h-24 md:w-28 md:h-28 group">
            {/* Ambient glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-gray-300/10 to-white/20 rounded-[36px] blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
            
            {/* Outer subtle ring for richness */}
            <div className="absolute -inset-[1px] bg-gradient-to-br from-gray-400/30 via-gray-500/20 to-gray-400/30 rounded-[33px] blur-sm opacity-60"></div>
            
            {/* Premium metallic border */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-400 via-gray-500 via-gray-600 to-gray-400 rounded-[32px] p-[2px] shadow-[0_0_20px_rgba(156,163,175,0.15)]">
              {/* Main logo container with rich depth */}
              <div className="relative w-full h-full bg-gradient-to-br from-[#1d1d1d] via-[#242424] via-[#202020] to-[#1d1d1d] rounded-[30px] flex items-center justify-center transform transition-all duration-500 group-hover:scale-[1.02] shadow-[inset_0_1px_1px_rgba(255,255,255,0.03),0_10px_40px_rgba(0,0,0,0.7)] group-hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.05),0_15px_60px_rgba(0,0,0,0.9)]">
                {/* Multi-layer inner highlights for premium depth */}
                <div className="absolute inset-[1px] bg-gradient-to-br from-white/8 via-white/3 to-transparent rounded-[29px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/[0.02] rounded-[30px]" />
                
                {/* Icon with enhanced glow */}
                <svg className="w-12 h-12 md:w-14 md:h-14 text-white relative z-10 drop-shadow-[0_4px_12px_rgba(255,255,255,0.4)] group-hover:drop-shadow-[0_6px_16px_rgba(255,255,255,0.5)] transition-all duration-500" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Search bar - Below the scrolling rows */}
        <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-16 relative z-20" style={{ marginTop: '200px' }}>
          <div className={`relative group bg-[#212121] rounded-full z-20 transition-all duration-700 ease-in-out ${isTransitioning ? 'scale-105 translate-y-[42vh] opacity-90' : ''}`}>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-full blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
            
            <div className="relative bg-[#212121] rounded-full px-1.5 py-1.5">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What are you looking for?"
                className="w-full px-7 py-4 bg-zinc-900/60 border border-white/[0.12] rounded-full 
                         text-white placeholder:text-zinc-400 text-base
                         focus:outline-none focus:border-white/25 focus:bg-zinc-800/70
                         backdrop-blur-2xl transition-all duration-300
                         shadow-[0_0_1px_rgba(255,255,255,0.05)]
                         focus:shadow-[0_0_30px_rgba(255,255,255,0.08)]"
              />
              
              <div className="absolute inset-0 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-md" />
              </div>
              
              <button
                type="submit"
                disabled={!query.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10
                         w-10 h-10 bg-white hover:bg-gray-100 text-black rounded-full 
                         flex items-center justify-center transition-all duration-200
                         disabled:opacity-20 disabled:cursor-not-allowed
                         hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </form>

        {/* Quranic Verse - Clean English only */}
        <div className="flex flex-col items-center gap-2 px-6">
          {/* English translation */}
          <p className="text-base sm:text-lg text-gray-400 italic opacity-0 animate-fade-in" style={{ animationDelay: '0s', animationFillMode: 'forwards' }}>
            "{dailyVerse.text}"
          </p>
          
          {/* Surah reference */}
          <p className="text-xs text-zinc-600 opacity-0 animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            {dailyVerse.reference}
          </p>
        </div>
      </div>


    </div>
  );
}
