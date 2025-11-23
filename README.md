# Buraq X - Muslim Community Concierge Platform

An AI-powered web application connecting Muslims with trusted community services, providers, and events. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 🌟 Overview

Buraq X is a V1 MVP that allows users to find verified Muslim providers, freelancers, masajid events, and community services through natural language chat. The platform focuses on halal standards, gender preferences, and community trust.

## ✨ Features

### V1 Categories (Supported)
- **STEM Tutoring** - Math, physics, computer science
- **Creative Freelancers** - Photographers, videographers, designers
- **Home Services** - Plumbers, electricians, handymen
- **Masjid & MSA Events** - Halaqas, youth events, community gatherings
- **Wedding Services (Non-Food)** - Henna, decor, photography, planning

### Core Functionality
- 💬 Natural language chat interface
- 🔍 Smart category matching and search
- ⭐ Featured listings and community endorsements
- 👥 Gender preference filtering
- 📍 Location-based search
- 📋 Provider onboarding with approval workflow
- 🎛️ Admin dashboard for listing management
- 📊 User suggestion tracking for unsupported categories

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Validation**: Zod schemas
- **Data Layer**: In-memory (designed for easy Prisma/DB swap)
- **State Management**: React hooks + Server Components

## 📁 Project Structure

```
BuraqX/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── chat/route.ts         # Chat endpoint
│   │   ├── listings/route.ts     # Listings CRUD
│   │   └── admin/                # Admin endpoints
│   ├── chat/page.tsx             # Chat interface
│   ├── join/page.tsx             # Provider onboarding
│   ├── admin/page.tsx            # Admin dashboard
│   ├── page.tsx                  # Landing page
│   ├── layout.tsx                # Root layout
│   ├── error.tsx                 # Error boundary
│   ├── not-found.tsx             # 404 page
│   └── globals.css               # Global styles
├── components/                   # Shared React components
│   ├── LayoutShell.tsx           # Nav + Footer
│   ├── ChatMessage.tsx           # Chat bubble
│   ├── ResultCard.tsx            # Listing card
│   ├── CategoryBadge.tsx         # Category label
│   └── LoadingSpinner.tsx        # Loading indicator
├── lib/                          # Core business logic
│   ├── models.ts                 # TypeScript types/interfaces
│   ├── validation/               # Zod schemas
│   │   └── schemas.ts
│   ├── repositories/             # Data access layer
│   │   ├── listingRepository.ts
│   │   └── suggestionRepository.ts
│   └── chat/                     # Chat logic
│       ├── parser.ts             # Keyword extraction
│       └── formatter.ts          # Response generation
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── .env.example
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- A code editor (VS Code recommended)

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd /Users/zuhair/Documents/BuraqX
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### For Users (Seekers)

1. Visit the homepage
2. Click "Start a Request" or go to `/chat`
3. Type naturally, e.g.:
   - "I need a plumber in Scarborough"
   - "Find a sisters-only halaqa near North York"
   - "Looking for a math tutor"
4. View matched results in the sidebar
5. Contact providers directly

### For Providers

1. Visit `/join`
2. Fill out the onboarding form with:
   - Profile type (supplier/freelancer/masjid)
   - Category selection
   - Contact info and description
   - Pricing and availability
3. Submit for review
4. Wait for admin approval (24-48 hours)

### For Admins

1. Visit `/admin`
2. Review pending listings
3. Approve/reject submissions
4. Toggle featured status for approved listings
5. Check user suggestions for new categories

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

### Key Design Decisions

1. **In-Memory Data Store**: Current implementation uses arrays for quick prototyping. The repository pattern makes it easy to swap with Prisma/Postgres later.

2. **Keyword-Based NLP**: V1 uses simple keyword matching for category detection. The modular design in `lib/chat/parser.ts` allows for easy LLM integration.

3. **Stub Authentication**: Auth is commented out for V1. The structure supports adding auth middleware in API routes.

4. **No Real Maps**: Map functionality is prepared but not implemented. Location is text-based for V1.

5. **Strict TypeScript**: No `any` types, full type safety throughout.

## 🎨 Styling

The project uses Tailwind CSS with custom utility classes:

- `.btn-primary` - Primary action button
- `.btn-secondary` - Secondary action button
- `.input-field` - Form input styling
- `.card` - Content card wrapper

Colors are defined in `tailwind.config.ts` with a primary palette.

## 🔐 Security Considerations (Future)

- Add authentication middleware (NextAuth.js recommended)
- Rate limiting on API endpoints
- Input sanitization and XSS protection
- CSRF tokens for forms
- Environment variable validation

## 📊 Database Migration Path (Future)

When ready to add a real database:

1. Install Prisma: `npm install prisma @prisma/client`
2. Initialize Prisma: `npx prisma init`
3. Define schema based on `lib/models.ts`
4. Update repository files to use Prisma Client
5. Run migrations: `npx prisma migrate dev`

The repository pattern ensures minimal changes to API routes and components.

## 🧪 Testing Strategy (Future)

Recommended testing approach:

- **Unit Tests**: Repository logic, parsers, formatters
- **Integration Tests**: API routes
- **E2E Tests**: User flows (Playwright/Cypress)
- **Component Tests**: React Testing Library

## 📈 Future Enhancements

### V2 Planned Features
- Real authentication and user accounts
- OpenAI integration for better NLP
- Direct messaging between users and providers
- Provider reviews and ratings
- Payment processing integration
- Mobile apps (React Native)
- Real-time notifications
- Advanced search filters
- Multi-language support (Arabic)

### Additional Categories (Post-V1)
- Islamic Knowledge Tutors
- Catering Services
- Therapists & Counselors
- Daycare Services
- Real Estate Agents
- Financial Advisors (Halal Finance)

## 🤝 Contributing

This is currently a V1 MVP. Contribution guidelines will be added as the project grows.

## 📄 License

[Add your license here]

## 👥 Team

Built by the Buraq X team with the vision of strengthening Muslim community connections.

## 📞 Contact

- Email: hello@buraqx.com
- Website: [Coming soon]

---

**Note**: This is a V1 MVP focused on core functionality. Many features are intentionally simplified or stubbed for rapid development and validation.

## 🐛 Known Limitations

- No persistent database (in-memory storage only)
- No real authentication
- Simple keyword-based category matching
- No real-time features
- Text-based location (no geocoding)
- No payment processing
- No direct messaging
- Admin panel has no auth protection

These limitations are by design for V1 and will be addressed in future iterations.

---

**Built with ❤️ for the Muslim community**
