// app/api/posts/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

// Helper function to validate session and get user ID
async function getUserId() {
  const session = await getServerSession(authOptions);
  console.log('Session:', session); // Debugging line
  if (!session || !session.user || !session.user.id) {
    throw new Error('Unauthorized: No user session found');
  }
  return session.user.id;
}

// Random generator helper
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function POST(request: Request) {
  try {
    const user_id = await getUserId();
    const body = await request.json();
    const { title, content, status, platforms } = body;

    // Validate required fields
    if (!title || !content || !platforms || platforms.length === 0) {
      return new NextResponse(
        JSON.stringify({ message: 'Missing required fields' }),
        { status: 400 }
      );
    }

    // Create post + analytics with random values
    const newPost = await prisma.post.create({
      data: {
        userId: user_id,
        title,
        content,
        status: status || 'draft',
        platforms,
        analytics: {
          create: {
            reach: getRandomInt(1000, 100000),
            likes: getRandomInt(100, 100000),
            comments: getRandomInt(100, 100000),
            shares: getRandomInt(100, 100000),
          },
        },
      },
      include: { analytics: true },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return new NextResponse(
      JSON.stringify({ message: 'Failed to create post' }),
      { status: 500 }
    );
  }
}
