'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { V1_CATEGORIES } from '@/lib/models';

export default function AboutPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-gradient-to-br from-[#0a0a0a] via-[#151515] to-[#0f0f0f] min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-tight mb-6 sm:mb-8">
            <span className="block text-white">About</span>
            <span className="block text-white/40 mt-2">BuraqX</span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-500 font-light max-w-2xl mx-auto leading-relaxed">
            Connecting trusted professionals with those who need them
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24 border-t border-zinc-950">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-xs sm:text-sm text-zinc-600 font-light mb-10 sm:mb-16 uppercase tracking-wider">
            How it works
          </h2>
          <div className="space-y-12 sm:space-y-16">
            {/* Step 1 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-8 items-start">
              <div className="md:col-span-2">
                <span className="text-4xl sm:text-6xl font-light text-white/20">01</span>
              </div>
              <div className="md:col-span-10">
                <h3 className="text-xl sm:text-2xl font-light text-white mb-2 sm:mb-3">
                  Describe what you need
                </h3>
                <p className="text-sm sm:text-base text-zinc-500 font-light leading-relaxed">
                  Simply tell us what you're looking for in natural language. No forms, no categories to select.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-8 items-start">
              <div className="md:col-span-2">
                <span className="text-4xl sm:text-6xl font-light text-white/20">02</span>
              </div>
              <div className="md:col-span-10">
                <h3 className="text-xl sm:text-2xl font-light text-white mb-2 sm:mb-3">
                  Get matched instantly
                </h3>
                <p className="text-sm sm:text-base text-zinc-500 font-light leading-relaxed">
                  Our AI understands your needs and connects you with verified professionals in seconds.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-8 items-start">
              <div className="md:col-span-2">
                <span className="text-4xl sm:text-6xl font-light text-white/20">03</span>
              </div>
              <div className="md:col-span-10">
                <h3 className="text-xl sm:text-2xl font-light text-white mb-2 sm:mb-3">
                  Connect directly
                </h3>
                <p className="text-sm sm:text-base text-zinc-500 font-light leading-relaxed">
                  Reach out to your chosen provider and get started right away.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 sm:py-24 border-t border-zinc-950">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-xs sm:text-sm text-zinc-600 font-light mb-10 sm:mb-16 uppercase tracking-wider">
            Available services
          </h2>
          <div className="space-y-4 sm:space-y-6">
            {V1_CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/chat?category=${category.slug}`}
                className="block group"
              >
                <div className="flex items-start justify-between py-4 sm:py-6 border-b border-zinc-950 hover:border-zinc-900 transition-colors">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-light text-white mb-1.5 sm:mb-2 group-hover:text-zinc-300 transition-colors">
                      {category.label}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 font-light pr-2">
                      {category.description}
                    </p>
                  </div>
                  <div className="text-zinc-700 group-hover:text-zinc-500 transition-colors ml-4 text-lg">
                    →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Verse Section - Premium Feature */}
      <section className="py-32 border-t border-zinc-950">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-8 overflow-x-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-6 inline-block" style={{ fontFamily: "'Cairo', sans-serif", lineHeight: "1.6", whiteSpace: "nowrap" }}>
              وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ
            </h2>
            <p className="text-[15px] text-zinc-500 italic mb-2">
              "And cooperate in righteousness and piety"
            </p>
            <p className="text-[12px] text-zinc-700">
              Surah Al-Ma'idah, 5:2
            </p>
          </div>
          <div className="mt-12 pt-12 border-t border-zinc-950">
            <p className="text-base text-zinc-400 font-light leading-relaxed">
              This verse guides our mission. We believe in the power of community,
              the strength in helping one another, and the importance of connecting
              people with trusted services.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 border-t border-zinc-950">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-sm text-zinc-600 font-light mb-12 uppercase tracking-wider">
            Our mission
          </h2>
          <p className="text-xl text-zinc-400 font-light leading-relaxed">
            We exist to strengthen community connections by making it effortless to find trusted professionals. No complexity, no friction—just simple, reliable access to the services you need.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-zinc-950">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Link 
            href="/chat" 
            className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-zinc-100 text-black rounded-full text-sm font-medium transition-all duration-200"
          >
            Get started
          </Link>
        </div>
      </section>
    </motion.div>
  );
}
