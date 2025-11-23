'use client';

import { useState } from 'react';
import CategoryBadge from '@/components/CategoryBadge';

interface Category {
  id: string;
  slug: string;
  label: string;
  type: string;
  description?: string | null;
  keywords: string[];
}

interface JoinFormProps {
  categories: Category[];
}

export default function JoinForm({ categories }: JoinFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    orgName: '',
    email: '',
    phone: '',
    type: 'supplier' as 'supplier' | 'freelancer' | 'masjid_msa',
    categoryId: '',
    locationText: '',
    description: '',
    tags: '',
    genderOfProvider: '' as '' | 'male' | 'female' | 'mixed' | 'unspecified',
    certifications: '',
    yearsOfExperience: '',
    pricingMin: '',
    pricingMax: '',
    pricingUnit: 'hour',
    responseTime: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Convert form data to API format - keep tags and certifications as strings
      const payload = {
        ...formData,
        // Keep as strings - the schema will transform them
        tags: formData.tags,
        certifications: formData.certifications || undefined,
        yearsOfExperience: formData.yearsOfExperience ? parseInt(formData.yearsOfExperience) : undefined,
        pricingMin: formData.pricingMin ? parseFloat(formData.pricingMin) : undefined,
        pricingMax: formData.pricingMax ? parseFloat(formData.pricingMax) : undefined,
        pricingCurrency: formData.pricingMin || formData.pricingMax ? 'CAD' : undefined,
        // Remove empty phone to avoid validation error
        phone: formData.phone || undefined,
      };

      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit listing');
      }

      setSubmitSuccess(true);
    } catch (error: any) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCategory = categories.find(c => c.id === formData.categoryId);

  if (submitSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="mb-6">
          <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4">Listing Submitted! 🎉</h1>
        <p className="text-gray-600 mb-6">
          JazakAllah Khair for joining Buraq X! Your listing has been submitted for review.
          We'll review it and get back to you within 24-48 hours inshaAllah.
        </p>
        <button
          onClick={() => {
            setSubmitSuccess(false);
            setFormData({
              name: '',
              orgName: '',
              email: '',
              phone: '',
              type: 'supplier',
              categoryId: '',
              locationText: '',
              description: '',
              tags: '',
              genderOfProvider: '',
              certifications: '',
              yearsOfExperience: '',
              pricingMin: '',
              pricingMax: '',
              pricingUnit: 'hour',
              responseTime: '',
            });
          }}
          className="btn-primary"
        >
          Submit Another Listing
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="card">
        <h1 className="text-3xl font-bold mb-2">Join Buraq X as a Provider</h1>
        <p className="text-gray-600 mb-8">
          Fill out the form below to create your listing. We'll review it and get back to you within 24-48 hours inshaAllah.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Type */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Profile Type <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              className="input-field"
            >
              <option value="supplier">Supplier / Business</option>
              <option value="freelancer">Freelancer / Individual</option>
              <option value="masjid_msa">Masjid / MSA / Community Org</option>
            </select>
          </div>

          {/* Name and Organization */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
                placeholder="John Smith"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Business / Organization Name
              </label>
              <input
                type="text"
                value={formData.orgName}
                onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                className="input-field"
                placeholder="ABC Tutoring Services"
              />
            </div>
          </div>

          {/* Email and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-field"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="input-field"
                placeholder="(416) 555-1234"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="input-field"
            >
              <option value="">Select a category...</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
            {selectedCategory && (
              <div className="mt-2">
                <CategoryBadge categoryId={selectedCategory.id} />
              </div>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Location / Area Served <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.locationText}
              onChange={(e) => setFormData({ ...formData, locationText: e.target.value })}
              className="input-field"
              placeholder="Scarborough, Toronto"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field"
              placeholder="Describe your services, experience, and what makes you unique..."
            />
            <p className="text-sm text-gray-500 mt-1">Minimum 10 characters</p>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="input-field"
              placeholder="math tutoring, university level, online"
            />
          </div>

          {/* Gender and Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Gender of Provider
              </label>
              <select
                value={formData.genderOfProvider}
                onChange={(e) => setFormData({ ...formData, genderOfProvider: e.target.value as any })}
                className="input-field"
              >
                <option value="">Prefer not to specify</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="mixed">Mixed / Team</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Years of Experience
              </label>
              <input
                type="number"
                min="0"
                value={formData.yearsOfExperience}
                onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                className="input-field"
                placeholder="5"
              />
            </div>
          </div>

          {/* Pricing */}
          <div>
            <label className="block text-sm font-medium mb-4">
              Pricing (Optional)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.pricingMin}
                onChange={(e) => setFormData({ ...formData, pricingMin: e.target.value })}
                className="input-field"
                placeholder="Min price (e.g., 40)"
              />
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.pricingMax}
                onChange={(e) => setFormData({ ...formData, pricingMax: e.target.value })}
                className="input-field"
                placeholder="Max price (e.g., 60)"
              />
              <select
                value={formData.pricingUnit}
                onChange={(e) => setFormData({ ...formData, pricingUnit: e.target.value })}
                className="input-field"
              >
                <option value="hour">per hour</option>
                <option value="session">per session</option>
                <option value="day">per day</option>
                <option value="project">per project</option>
                <option value="event">per event</option>
              </select>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Certifications (comma-separated)
            </label>
            <input
              type="text"
              value={formData.certifications}
              onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
              className="input-field"
              placeholder="B.Sc. Mathematics, Certified Electrician"
            />
          </div>

          {/* Response Time */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Typical Response Time
            </label>
            <input
              type="text"
              value={formData.responseTime}
              onChange={(e) => setFormData({ ...formData, responseTime: e.target.value })}
              className="input-field"
              placeholder="within 24 hours"
            />
          </div>

          {/* Error Message */}
          {submitError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {submitError}
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full py-3 text-lg"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Listing for Review'}
            </button>
            <p className="text-sm text-gray-500 text-center mt-3">
              By submitting, you agree to our terms and that your information will be reviewed by our team.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
