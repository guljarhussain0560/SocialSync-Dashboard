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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user_id = await getUserId();
    const postId = params.id;
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
        userId: user_id, 
      },
      include: {
        analytics: true,
      },
    });

    if (!post) {
      return new NextResponse(JSON.stringify({ message: 'Post not found' }), { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error(`Error fetching post ${params.id}:`, error);
    return new NextResponse(JSON.stringify({ message: 'Failed to fetch post' }), { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user_id = await getUserId();
    const postId = params.id;

    // Security check: Make sure the post exists and belongs to the user before updating
    const post = await prisma.post.findFirst({
      where: { id: postId, userId: user_id },
    });

    if (!post) {
      return new NextResponse(JSON.stringify({ message: 'Post not found or you do not have permission to edit it' }), { status: 404 });
    }

    const body = await request.json();
    const { title, content, status, platforms } = body;

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: title || post.title,
        content: content || post.content,
        status: status || post.status,
        platforms: platforms || post.platforms,
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error(`Error updating post ${params.id}:`, error);
    return new NextResponse(JSON.stringify({ message: 'Failed to update post' }), { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user_id = await getUserId();
    const postId = params.id;

    // Security check: Make sure the post exists and belongs to the user before deleting
    const post = await prisma.post.findFirst({
      where: { id: postId, userId: user_id },
    });

    if (!post) {
      return new NextResponse(JSON.stringify({ message: 'Post not found' }), { status: 404 });
    }

    // If the post exists and belongs to the user, delete it
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    // Return a 204 No Content response, which is standard for a successful DELETE
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(`Error deleting post ${params.id}:`, error);
    return new NextResponse(JSON.stringify({ message: 'Failed to delete post' }), { status: 500 });
  }
}