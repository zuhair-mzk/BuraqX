/**
 * Authentication utilities
 * Handles user sessions and authentication
 */

import { cookies } from 'next/headers';
import { prisma } from './db';
import * as bcrypt from 'bcryptjs';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}

/**
 * Hash a password
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

/**
 * Verify a password
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Create a new user account
 */
export async function createUser(data: {
  name: string;
  email: string;
  password: string;
}): Promise<User> {
  const hashedPassword = await hashPassword(data.password);
  
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: 'customer',
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return user;
}

/**
 * Authenticate a user
 */
export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.password) {
    return null;
  }

  const isValid = await verifyPassword(password, user.password);
  
  if (!isValid) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
}

/**
 * Get user by ID
 */
export async function getUserById(id: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return user;
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return user;
}

/**
 * Simple session management using cookies
 */
export async function createSession(userId: string): Promise<string> {
  // In production, use a proper session token with JWT or similar
  // For now, we'll use a simple approach
  const sessionToken = Buffer.from(userId).toString('base64');
  return sessionToken;
}

/**
 * Get current user from session
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('session')?.value;

    if (!sessionToken) {
      return null;
    }

    // Decode the session token to get user ID
    const userId = Buffer.from(sessionToken, 'base64').toString('utf-8');
    
    return getUserById(userId);
  } catch (error) {
    return null;
  }
}

/**
 * Clear the current session
 */
export async function clearSession(): Promise<void> {
  const cookieStore = cookies();
  cookieStore.delete('session');
}
