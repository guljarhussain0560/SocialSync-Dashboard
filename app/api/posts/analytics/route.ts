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

export async function GET() {
  try {
    const userId = await getUserId();

    // Fetch posts with analytics for the authenticated user
    const postsWithAnalytics = await prisma.post.findMany({
      where: { userId },
      include: {
        analytics: true,
      },
    });

    return NextResponse.json(postsWithAnalytics);
  } catch (error) {
    console.error('Error fetching posts with analytics:', error);
    return new NextResponse(JSON.stringify({ message: 'Failed to fetch data' }), { status: 500 });
  }
}