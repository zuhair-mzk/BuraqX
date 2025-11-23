# Provider AI Chatbot System

## Overview
Each service provider now has their own personal AI assistant that can handle inquiries, provide information, and coordinate scheduling on their behalf.

## Features

### 🤖 Personal AI Assistant
- **Custom Chatbot**: Every provider gets their own AI assistant accessible at `/provider/[id]/chat`
- **Provider Context**: The AI knows the provider's services, pricing, location, experience, certifications, and specialties
- **Natural Conversations**: Powered by GPT-4o-mini, the AI responds naturally and professionally
- **Conversation History**: Maintains context across the conversation for intelligent responses

### 📅 Scheduling Capabilities
- **Meeting Coordination**: Can handle scheduling requests and coordinate appointments
- **Availability Checking**: Discusses availability and helps find suitable time slots
- **Proactive Assistance**: Asks for preferred dates/times if not provided
- **Response Time Communication**: Informs users about typical response times

### 💬 Smart Responses
- **Service Information**: Answers questions about services offered
- **Pricing Details**: Provides pricing information when available
- **Location & Experience**: Shares provider location and years of experience
- **Certifications**: Highlights relevant certifications and specialties

## Technical Implementation

### Frontend
**Location**: `app/provider/[id]/chat/page.tsx`

Features:
- Clean chat interface matching app's premium design
- Real-time message display
- Conversation history tracking
- Loading states and error handling
- Back button to provider profile
- Mobile responsive design

### Backend API
**Location**: `app/api/provider-chat/route.ts`

Endpoint: `POST /api/provider-chat`

Request body:
```json
{
  "message": "User's message",
  "providerId": "Provider's ID",
  "conversationHistory": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}
```

Response:
```json
{
  "response": "AI assistant's response",
  "providerId": "Provider's ID"
}
```

### AI Logic
**Location**: `lib/provider-ai.ts`

Functions:
- `chatWithProviderAssistant()`: Main AI response generation
- `isSchedulingRequest()`: Detects scheduling-related messages
- `extractSchedulingInfo()`: Extracts dates and times from messages

AI Configuration:
- Model: GPT-4o-mini
- Temperature: 0.7 (conversational and natural)
- Max tokens: 300 (concise responses)
- Context: Provider-specific system prompt

## User Flow

1. **Discovery**: User finds a provider through search results
2. **Provider Profile**: User clicks on a result card to view provider details at `/provider/[id]`
3. **AI Chat Access**: User clicks "Chat with AI Assistant" button on provider profile
4. **Conversation**: User chats with provider's AI about services, pricing, and scheduling
5. **Scheduling**: AI helps coordinate meetings and appointments
6. **Follow-up**: AI provides provider's contact info for final confirmation

## AI Personality

The provider AI assistants are:
- **Professional**: Maintains business-appropriate tone
- **Helpful**: Proactively asks clarifying questions
- **Knowledgeable**: Well-informed about provider's specific services
- **Responsive**: Quick, concise answers (300 token limit)
- **Contextual**: Uses conversation history for relevant responses

## System Prompt Structure

Each AI assistant receives context including:
- Provider name and title
- Service location
- Years of experience
- Response time expectations
- Pricing information (when available)
- Specialties/tags
- Certifications

The prompt instructs the AI to:
- Represent the provider professionally
- Answer service-related questions
- Help with scheduling coordination
- Be proactive about collecting booking details
- Stay in character as the provider's assistant

## Scheduling Intelligence

The AI can detect scheduling requests through keywords:
- book, schedule, appointment, meeting
- available, availability, when can
- time slot, reserve, consultation
- session, urgent, ASAP

When scheduling is detected, the AI:
1. Confirms the service interest
2. Asks for preferred dates/times
3. Collects necessary details
4. Explains the confirmation process
5. Provides response time expectations

## Future Enhancements

Potential additions:
- **Calendar Integration**: Direct booking with availability checking
- **Appointment Database**: Store scheduled appointments in Prisma
- **Email Notifications**: Notify providers of new booking requests
- **Provider Dashboard**: Manage appointments and AI settings
- **Custom Knowledge Base**: Allow providers to add FAQs
- **Analytics**: Track chat engagement and booking conversions
- **Multi-language**: Support for Arabic and other languages

## Testing

To test the provider chatbot:

1. Start the development server: `npm run dev`
2. Navigate to the home page
3. Search for a service (e.g., "math tutor")
4. Click on a result card
5. On the provider page, click "Chat with AI Assistant"
6. Try various queries:
   - "What services do you offer?"
   - "How much do you charge?"
   - "Can I schedule a session?"
   - "Are you available next Tuesday at 3pm?"

## Design Consistency

The chatbot interface matches BuraqX's ultra-premium aesthetic:
- Pure black background (#000000)
- Zinc text colors (700/800/900)
- Font extralight with wide tracking
- Smooth 700ms transitions
- Backdrop blur effects
- Subtle hover states
- Responsive grid layouts

## Code Quality

- **TypeScript**: Full type safety
- **Error Handling**: Graceful fallbacks
- **Loading States**: User feedback during API calls
- **Input Validation**: Required fields checked
- **Conversation Limits**: Last 5 messages for context
- **Token Limits**: 300 max for fast responses

## Performance

- **Fast Response**: ~1-2 seconds per message
- **Efficient Model**: GPT-4o-mini for speed
- **Context Management**: Only last 5 messages sent
- **Optimized Prompts**: Concise system instructions
- **Error Recovery**: Fallback messages on failures

## Accessibility

- **Semantic HTML**: Proper heading hierarchy
- **Keyboard Navigation**: Full keyboard support
- **Clear Labels**: Descriptive button text
- **Loading States**: Visual feedback for all actions
- **Error Messages**: Clear, actionable error text
- **Mobile Friendly**: Responsive on all devices

---

**Status**: ✅ Fully Implemented
**Last Updated**: 2024
