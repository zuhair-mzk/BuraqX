import Link from 'next/link';
import { V1_CATEGORIES } from '@/lib/models';
import CategoryBadge from '@/components/CategoryBadge';

export default function AboutPage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            As-salamu alaykum!
            <br />
            About <span className="text-primary-600">Buraq X</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your trusted Muslim community concierge. Find verified providers, freelancers,
            masajid events, and services—all in one place. Chat naturally, get curated results.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Chat Naturally
              </h3>
              <p className="text-gray-600">
                Tell us what you need in your own words. "I need a plumber in Scarborough"
                or "Find a sisters' halaqa near me."
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Get Curated Results
              </h3>
              <p className="text-gray-600">
                We match you with 1-3 trusted, verified providers from our Muslim community
                database.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Connect & Done
              </h3>
              <p className="text-gray-600">
                Contact your chosen provider directly through Buraq X and get the help you need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            What We Support (V1)
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            We're starting with these carefully selected categories. More coming soon inshaAllah!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {V1_CATEGORIES.map((category) => (
              <div
                key={category.id}
                className="card hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {category.label}
                  </h3>
                  <CategoryBadge categoryId={category.id} size="sm" />
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {category.description}
                </p>
                <Link
                  href={`/chat?category=${category.slug}`}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Search in this category →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Our Mission
          </h2>
          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="text-center">
              Buraq X exists to strengthen the Muslim community by making it easier to find
              and connect with trusted, halal services. We believe in supporting Muslim
              businesses, professionals, and community leaders while providing a safe,
              values-aligned platform for Muslims to get the help they need.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to find what you need?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Join hundreds of Muslims connecting with trusted community services.
          </p>
          <Link href="/chat" className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Start Your Request Now
          </Link>
        </div>
      </section>
    </div>
  );
}
