-- Create ChatHistory table
CREATE TABLE IF NOT EXISTS "chat_history" (
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
CREATE TABLE IF NOT EXISTS "calendar_events" (
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
CREATE INDEX IF NOT EXISTS "chat_history_userId_idx" ON "chat_history"("userId");
CREATE INDEX IF NOT EXISTS "chat_history_createdAt_idx" ON "chat_history"("createdAt");
CREATE INDEX IF NOT EXISTS "chat_history_chatType_idx" ON "chat_history"("chatType");

-- Create indexes for CalendarEvent
CREATE INDEX IF NOT EXISTS "calendar_events_userId_idx" ON "calendar_events"("userId");
CREATE INDEX IF NOT EXISTS "calendar_events_startTime_idx" ON "calendar_events"("startTime");
