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

    // Create the post along with an empty Analytics record
    const newPost = await prisma.post.create({
      data: {
        userId: user_id,
        title,
        content,
        status: status || 'draft',
        platforms,
        analytics: {
          create: {}, // Automatically creates Analytics with default values
        },
      },
      include: { analytics: true }, // Return analytics in the response
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
