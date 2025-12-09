-- Drop existing users table if it has issues
DROP TABLE IF EXISTS "chat_history" CASCADE;
DROP TABLE IF EXISTS "calendar_events" CASCADE;
DROP TABLE IF EXISTS "users" CASCADE;

-- Create User table with correct schema
CREATE TABLE "users" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "password" TEXT,
  "role" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create ChatHistory table
CREATE TABLE "chat_history" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "messages" JSONB NOT NULL,
  "category" TEXT,
  "chatType" TEXT NOT NULL DEFAULT 'general',
  "providerId" TEXT,
  "providerName" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "chat_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create CalendarEvent table  
CREATE TABLE "calendar_events" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "startTime" TIMESTAMP(3) NOT NULL,
  "endTime" TIMESTAMP(3) NOT NULL,
  "location" TEXT,
  "color" TEXT DEFAULT '#3b82f6',
  "isAllDay" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for ChatHistory
CREATE INDEX "chat_history_userId_idx" ON "chat_history"("userId");
CREATE INDEX "chat_history_createdAt_idx" ON "chat_history"("createdAt");
CREATE INDEX "chat_history_chatType_idx" ON "chat_history"("chatType");

-- Create indexes for CalendarEvent
CREATE INDEX "calendar_events_userId_idx" ON "calendar_events"("userId");
CREATE INDEX "calendar_events_startTime_idx" ON "calendar_events"("startTime");
