// app/api/posts/[id]/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

// Helper to get logged-in user ID
async function getUserId() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !("id" in session.user)) {
    throw new Error("Unauthorized: No user session found");
  }
  return (session.user as { id: string }).id;
}

// GET post + analytics
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> } // ✅ params is a promise
) {
  try {
    const { id } = await context.params; // ✅ await params
    const user_id = await getUserId();

    const post = await prisma.post.findFirst({
      where: { id, userId: user_id },
      include: { analytics: true },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    // Add analyticsId for convenience
    const response = {
      ...post,
      analyticsId: post.analytics?.id || null,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ message: "Failed to fetch post" }, { status: 500 });
  }
}

// PUT update post
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const user_id = await getUserId();

    const post = await prisma.post.findFirst({
      where: { id, userId: user_id },
    });

    if (!post) {
      return NextResponse.json(
        { message: "Post not found or no permission" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { title, content, status, platforms } = body;

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title: title ?? post.title,
        content: content ?? post.content,
        status: status ?? post.status,
        platforms: platforms ?? post.platforms,
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error(`Error updating post:`, error);
    return NextResponse.json({ message: "Failed to update post" }, { status: 500 });
  }
}

// DELETE post
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const user_id = await getUserId();

    const post = await prisma.post.findFirst({
      where: { id, userId: user_id },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    await prisma.post.delete({ where: { id } });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(`Error deleting post:`, error);
    return NextResponse.json({ message: "Failed to delete post" }, { status: 500 });
  }
}
