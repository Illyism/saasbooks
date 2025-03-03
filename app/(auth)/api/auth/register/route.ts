import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { createSession, generateSessionToken } from '@/lib/session';
import { setSessionTokenCookie } from '@/lib/cookies';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user = await prisma.user.create({
      data: {
        email,
        name: name || email.split('@')[0], // Use part of email as default name
        password: hashedPassword
      }
    });

    // Create a new session
    const token = generateSessionToken();
    await createSession(token, user.id);

    // Set the session cookie
    await setSessionTokenCookie(token);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 