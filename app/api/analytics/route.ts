import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

// Helper function to validate session and get user ID
async function getUserId() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    throw new Error('Unauthorized: No user session found');
  }
  return session.user.id;
}

export async function GET(request: Request) {
  try {
    const userId = await getUserId();

    // Fetch analytics for the authenticated user's posts
    const analytics = await prisma.analytics.findMany({
      where: {
        post: {
          userId,
        },
      },
    });

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return new NextResponse(JSON.stringify({ message: 'Failed to fetch analytics' }), { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const userId = await getUserId();
    const body = await request.json();
    const { postId, reach = 0, likes = 0, comments = 0, shares = 0 } = body;

    // Ensure the post belongs to the authenticated user
    const post = await prisma.post.findFirst({
      where: { id: postId, userId },
    });

    if (!post) {
      return new NextResponse(JSON.stringify({ message: 'Post not found or unauthorized' }), { status: 404 });
    }

    // Update analytics for the post
    const updatedAnalytics = await prisma.analytics.update({
      where: { postId },
      data: {
        reach,
        likes,
        comments,
        shares,
      },
    });

    return NextResponse.json(updatedAnalytics);
  } catch (error) {
    console.error('Error updating analytics:', error);
    return new NextResponse(JSON.stringify({ message: 'Failed to update analytics' }), { status: 500 });
  }
}