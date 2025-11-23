# 🗄️ Database Setup Guide for Buraq X

## ✅ What's Been Set Up

- ✅ Prisma installed
- ✅ Schema created (`prisma/schema.prisma`) - maps all your existing models
- ✅ `.env.example` updated with database URL options

## 🚀 Choose Your Database Setup

### **Option 1: Supabase (Recommended - Easiest & Free)**

**Best for**: Quick start, free tier, no local setup needed

1. Go to [supabase.com](https://supabase.com) and sign up (free)
2. Create a new project
3. Copy the connection string from Settings → Database
4. Create a `.env` file with:
   ```
   DATABASE_URL="postgresql://postgres.[PASSWORD]@[PROJECT-REF].supabase.co:5432/postgres"
   ```
5. Run migrations:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

**Time**: 5 minutes ⚡

---

### **Option 2: Local PostgreSQL**

**Best for**: Development without internet dependency

**Prerequisites**: PostgreSQL installed on your Mac

#### Install PostgreSQL:
```bash
brew install postgresql@16
brew services start postgresql@16
```

#### Create database:
```bash
createdb buraqx
```

#### Create `.env` file:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/buraqx"
```

#### Run migrations:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

**Time**: 10 minutes

---

### **Option 3: Neon (Serverless Postgres)**

**Best for**: Serverless, auto-scaling, free tier

1. Go to [neon.tech](https://neon.tech) and sign up
2. Create a new project
3. Copy the connection string
4. Create a `.env` file with:
   ```
   DATABASE_URL="your-neon-connection-string"
   ```
5. Run migrations:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

**Time**: 5 minutes

---

## 📝 Next Steps (After DB Setup)

Once your database is configured:

### 1. Seed the Database
```bash
npx prisma db seed
```

### 2. Update Repository Files
I'll help you update:
- `lib/repositories/listingRepository.ts` → Use Prisma Client
- `lib/repositories/suggestionRepository.ts` → Use Prisma Client

### 3. Restart Server
```bash
npm run dev
```

---

## 🔍 Current Status

- ✅ Prisma schema: **Created**
- ⏳ Database connection: **Needs configuration**
- ⏳ Migrations: **Waiting for DB**
- ⏳ Repository updates: **Waiting for DB**

---

## 💡 My Recommendation

**Use Supabase** because:
- ✅ No local PostgreSQL installation needed
- ✅ Free tier is generous
- ✅ Web UI to view/manage data
- ✅ Easy connection string
- ✅ Works on any machine without setup

---

## 🆘 Let me know which option you want and I'll help you through it!
