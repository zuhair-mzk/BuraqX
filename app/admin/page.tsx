'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Mock service data - 40 different services
const mockServices = [
  { id: '1', name: 'Ahmed Khan', service: 'Math Tutoring', location: 'Toronto', status: 'active' },
  { id: '2', name: 'Fatima Ali', service: 'Quran Teacher', location: 'Mississauga', status: 'active' },
  { id: '3', name: 'Omar Hassan', service: 'Wedding Photography', location: 'Scarborough', status: 'pending' },
  { id: '4', name: 'Aisha Rahman', service: 'Graphic Design', location: 'Brampton', status: 'active' },
  { id: '5', name: 'Yusuf Ahmed', service: 'Plumbing Services', location: 'Markham', status: 'active' },
  { id: '6', name: 'Zainab Malik', service: 'Henna Artist', location: 'Toronto', status: 'pending' },
  { id: '7', name: 'Ibrahim Sheikh', service: 'Physics Tutoring', location: 'North York', status: 'active' },
  { id: '8', name: 'Maryam Syed', service: 'Event Planning', location: 'Mississauga', status: 'active' },
  { id: '9', name: 'Hassan Qureshi', service: 'Electrician', location: 'Vaughan', status: 'active' },
  { id: '10', name: 'Amina Farooq', service: 'Arabic Teacher', location: 'Oakville', status: 'pending' },
  { id: '11', name: 'Bilal Hussain', service: 'Web Development', location: 'Toronto', status: 'active' },
  { id: '12', name: 'Khadija Iqbal', service: 'Interior Design', location: 'Milton', status: 'active' },
  { id: '13', name: 'Tariq Nasir', service: 'Carpentry', location: 'Burlington', status: 'active' },
  { id: '14', name: 'Safiya Noor', service: 'Makeup Artist', location: 'Brampton', status: 'pending' },
  { id: '15', name: 'Rashid Khan', service: 'Chemistry Tutoring', location: 'Scarborough', status: 'active' },
  { id: '16', name: 'Hafsa Mahmood', service: 'Content Writing', location: 'Toronto', status: 'active' },
  { id: '17', name: 'Usman Ali', service: 'Personal Training', location: 'Mississauga', status: 'active' },
  { id: '18', name: 'Rania Youssef', service: 'Piano Teacher', location: 'Richmond Hill', status: 'pending' },
  { id: '19', name: 'Hamza Aziz', service: 'HVAC Repair', location: 'Ajax', status: 'active' },
  { id: '20', name: 'Layla Hassan', service: 'Videography', location: 'Toronto', status: 'active' },
  { id: '21', name: 'Faisal Rehman', service: 'Accounting Services', location: 'Markham', status: 'active' },
  { id: '22', name: 'Nadia Ahmed', service: 'Tailoring', location: 'Mississauga', status: 'pending' },
  { id: '23', name: 'Khalid Bashir', service: 'Roofing', location: 'Brampton', status: 'active' },
  { id: '24', name: 'Sumaya Khalil', service: 'UI/UX Design', location: 'Toronto', status: 'active' },
  { id: '25', name: 'Mustafa Sharif', service: 'Biology Tutoring', location: 'North York', status: 'active' },
  { id: '26', name: 'Yasmin Farah', service: 'Catering', location: 'Vaughan', status: 'pending' },
  { id: '27', name: 'Zayd Malik', service: 'Mobile App Dev', location: 'Toronto', status: 'active' },
  { id: '28', name: 'Iman Saeed', service: 'Voice Coach', location: 'Oakville', status: 'active' },
  { id: '29', name: 'Karim Ibrahim', service: 'Landscaping', location: 'Milton', status: 'active' },
  { id: '30', name: 'Leena Hasan', service: 'Calligraphy', location: 'Mississauga', status: 'pending' },
  { id: '31', name: 'Asim Raza', service: 'English Tutoring', location: 'Scarborough', status: 'active' },
  { id: '32', name: 'Samira Qasim', service: 'Social Media Management', location: 'Toronto', status: 'active' },
  { id: '33', name: 'Jamal Akhtar', service: 'Painting Services', location: 'Brampton', status: 'active' },
  { id: '34', name: 'Hiba Zahra', service: 'Life Coaching', location: 'Richmond Hill', status: 'pending' },
  { id: '35', name: 'Idris Mahmoud', service: 'SEO Specialist', location: 'Toronto', status: 'active' },
  { id: '36', name: 'Marwa Siddiqui', service: 'Photography', location: 'Mississauga', status: 'active' },
  { id: '37', name: 'Sulaiman Omar', service: 'Auto Repair', location: 'Ajax', status: 'active' },
  { id: '38', name: 'Noor Fadel', service: 'Yoga Instructor', location: 'Oakville', status: 'pending' },
  { id: '39', name: 'Rayan Abbas', service: 'Computer Science Tutoring', location: 'Markham', status: 'active' },
  { id: '40', name: 'Dina Kamal', service: 'Event Decoration', location: 'Toronto', status: 'active' },
];

export default function AdminPage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'pending'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = mockServices.filter(service => {
    const matchesFilter = filter === 'all' || service.status === filter;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#151515] to-[#0f0f0f]"
    >
      {/* Header */}
      <section className="relative pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-light text-white mb-1">Admin</h1>
              <p className="text-xs text-zinc-600 font-light">
                {filteredServices.length} providers
              </p>
            </div>
            <Link
              href="/"
              className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors font-light"
            >
              Back
            </Link>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Search */}
            <div className="w-full">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-2 bg-zinc-950/50 border border-zinc-900 rounded-lg text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-800 transition-colors font-light text-sm"
              />
            </div>

            {/* Status filter */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-full text-xs font-light transition-colors whitespace-nowrap ${
                  filter === 'all'
                    ? 'bg-white text-black'
                    : 'bg-zinc-950 text-zinc-500 hover:text-zinc-400 border border-zinc-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-4 py-2 rounded-full text-xs font-light transition-colors whitespace-nowrap ${
                  filter === 'active'
                    ? 'bg-white text-black'
                    : 'bg-zinc-950 text-zinc-500 hover:text-zinc-400 border border-zinc-900'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-full text-xs font-light transition-colors whitespace-nowrap ${
                  filter === 'pending'
                    ? 'bg-white text-black'
                    : 'bg-zinc-950 text-zinc-500 hover:text-zinc-400 border border-zinc-900'
                }`}
              >
                Pending
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="group p-4 sm:p-6 border border-zinc-950 hover:border-zinc-900 rounded-lg transition-colors"
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-light text-white mb-1 truncate">
                      {service.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 font-light truncate">
                      {service.service}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-light whitespace-nowrap ml-2 flex-shrink-0 ${
                      service.status === 'active'
                        ? 'bg-zinc-900 text-zinc-500'
                        : 'bg-zinc-900 text-zinc-400'
                    }`}
                  >
                    {service.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-700 font-light truncate">
                    {service.location}
                  </span>
                  <button className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors font-light ml-2 flex-shrink-0">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-16">
              <p className="text-zinc-600 font-light">No providers found</p>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
