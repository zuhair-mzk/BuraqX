# 🚀 Quick Start Guide - Buraq X

## Get Up and Running in 2 Minutes

### 1️⃣ Start the Development Server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### 2️⃣ Test the Core Features

#### **A. Chat Interface (Main Feature)**
1. Go to [http://localhost:3000/chat](http://localhost:3000/chat)
2. Try these queries:
   - "I need a plumber in Scarborough"
   - "Find me a math tutor"
   - "Looking for a wedding photographer"
   - "Are there any sisters' halaqas?"

#### **B. Provider Onboarding**
1. Go to [http://localhost:3000/join](http://localhost:3000/join)
2. Fill out the form to add a test listing
3. Submit and see the success message

#### **C. Admin Dashboard**
1. Go to [http://localhost:3000/admin](http://localhost:3000/admin)
2. See your submitted listing in "Pending" tab
3. Click "Approve" to activate it
4. Go back to chat and search for it!

### 3️⃣ Explore the Sample Data

The app comes pre-seeded with 5 sample listings:
- Professional Plumbing Services (Scarborough)
- Math & Physics Tutor (North York)
- Sisters-Only Halaqa (Mississauga)
- Wedding Photography (GTA)
- Computer Science Tutor (Downtown Toronto)

Try searching for these in the chat!

## 🎯 Key Pages

| Page | URL | Purpose |
|------|-----|---------|
| Home | `/` | Landing page with overview |
| Chat | `/chat` | Main search interface |
| Join | `/join` | Provider onboarding form |
| Admin | `/admin` | Manage listings & suggestions |

## 🔍 Testing the Chat Parser

The chat understands natural language. Try variations:
- ✅ "plumber scarborough" → Finds home services in Scarborough
- ✅ "need math help" → Finds STEM tutors
- ✅ "sisters event" → Finds women's events
- ✅ "wedding henna" → Finds wedding services
- ❌ "need a therapist" → Unsupported (logs as suggestion)

## 📝 Sample Queries by Category

### STEM Tutoring
- "I need a calculus tutor"
- "Find me a programming teacher"
- "Looking for physics help near me"

### Creative Freelancers
- "Need a photographer for an event"
- "Looking for a graphic designer"
- "Find me a videographer"

### Home Services
- "Plumber needed urgently"
- "Looking for an electrician in Toronto"
- "Need a handyman for repairs"

### Masjid & MSA Events
- "Are there any halaqas this week?"
- "Find sisters-only events"
- "Youth program near me"

### Wedding Services
- "Need henna artist for wedding"
- "Looking for wedding decorator"
- "Find wedding photographer"

## 🛠️ Development Tips

### Hot Reload
Changes to files automatically reload the browser. No need to restart the server!

### View Console Logs
All operations are logged with `[BURAQ_X]` prefix. Open browser DevTools (F12) to see:
- Search queries being parsed
- Repository operations
- API requests/responses

### Test API Directly

**Chat API:**
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"I need a plumber in Scarborough"}'
```

**Create Listing:**
```bash
curl -X POST http://localhost:3000/api/listings \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test User",
    "email":"test@example.com",
    "type":"supplier",
    "categoryId":"cat_home_services",
    "locationText":"Toronto",
    "description":"Test listing description",
    "tags":"test"
  }'
```

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is taken:
```bash
npm run dev -- -p 3001
```

### Clear In-Memory Data
The data resets every time you restart the server. To see fresh seed data, just restart:
```bash
# Stop with Ctrl+C, then:
npm run dev
```

### Type Errors
Run type check:
```bash
npm run type-check
```

### Build Errors
Try rebuilding:
```bash
rm -rf .next
npm run build
```

## 📦 Project Structure at a Glance

```
BuraqX/
├── app/              # Pages & API routes
├── components/       # Reusable UI components
├── lib/
│   ├── models.ts          # Types & constants
│   ├── validation/        # Zod schemas
│   ├── repositories/      # Data layer
│   └── chat/              # Chat logic
└── package.json
```

## ✅ Checklist for Demo

- [ ] Homepage loads correctly
- [ ] Chat interface is interactive
- [ ] Sample listings appear in search results
- [ ] Can submit a new listing via /join
- [ ] Admin dashboard shows pending listing
- [ ] Can approve listing in admin panel
- [ ] Approved listing appears in chat search
- [ ] Unsupported queries log as suggestions

## 🎓 Next Steps

1. **Customize the data**: Edit `lib/repositories/listingRepository.ts` seed data
2. **Add categories**: Update `V1_CATEGORIES` in `lib/models.ts`
3. **Improve parsing**: Enhance `lib/chat/parser.ts` keyword matching
4. **Style changes**: Edit `app/globals.css` or `tailwind.config.ts`
5. **Add database**: Follow README.md for Prisma integration guide

## 🆘 Need Help?

- Check the main `README.md` for detailed documentation
- Review code comments in key files (especially repositories and parsers)
- Check the browser console for `[BURAQ_X]` logs
- All TypeScript types are well-documented in `lib/models.ts`

---

**Happy coding! 🚀**

If everything is working, you're ready to customize and expand the platform!
