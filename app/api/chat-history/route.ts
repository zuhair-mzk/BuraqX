import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/db';

// GET /api/chat-history - List user's chat history
export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse query params for filtering
    const { searchParams } = new URL(request.url);
    const chatType = searchParams.get('chatType');

    // Build where clause
    const whereClause: any = { userId: user.id };
    
    // Add chatType filter if provided
    if (chatType && chatType !== 'all') {
      whereClause.chatType = chatType;
    }

    const chatHistory = await prisma.chatHistory.findMany({
      where: whereClause,
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json({ chats: chatHistory });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/chat-history - Save new chat or update existing
export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, title, messages, matches, category } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Update existing chat
    if (id) {
      const chat = await prisma.chatHistory.update({
        where: { id, userId: user.id },
        data: {
          title: title || 'Untitled Chat',
          messages,
          matches,
          category,
          updatedAt: new Date(),
        },
      });

      return NextResponse.json({ chat });
    }

    // Create new chat
    const chat = await prisma.chatHistory.create({
      data: {
        userId: user.id,
        title: title || 'Untitled Chat',
        messages,
        matches,
        category,
      },
    });

    return NextResponse.json({ chat });
  } catch (error) {
    console.error('Error saving chat history:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
