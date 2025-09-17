// app/api/posts/analytics/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

// Helper to get logged-in user ID
async function getUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Unauthorized: No user session found");
  }
  return session.user.id;
}

// GET analytics by analytics id
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> } // params is a Promise
) {
  try {
    const { id } = await context.params;
    const userId = await getUserId();

    const analytics = await prisma.analytics.findFirst({
      where: {
        id,
        post: { userId }, // ensure it belongs to the user's post
      },
    });

    if (!analytics) {
      return NextResponse.json({ message: "Analytics not found" }, { status: 404 });
    }

    return NextResponse.json(analytics);
  } catch (error) {
    console.error(`Error fetching analytics ${error}`);
    return NextResponse.json({ message: "Failed to fetch analytics" }, { status: 500 });
  }
}

// UPDATE analytics
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const userId = await getUserId();
    const body = await request.json();
    const { reach, likes, comments, shares } = body;

    const analytics = await prisma.analytics.findFirst({
      where: { id, post: { userId } },
    });

    if (!analytics) {
      return NextResponse.json({ message: "Analytics not found" }, { status: 404 });
    }

    const updatedAnalytics = await prisma.analytics.update({
      where: { id: analytics.id },
      data: { reach, likes, comments, shares },
    });

    return NextResponse.json(updatedAnalytics);
  } catch (error) {
    console.error(`Error updating analytics ${error}`);
    return NextResponse.json({ message: "Failed to update analytics" }, { status: 500 });
  }
}

// DELETE analytics
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const userId = await getUserId();

    const analytics = await prisma.analytics.findFirst({
      where: { id, post: { userId } },
    });

    if (!analytics) {
      return NextResponse.json({ message: "Analytics not found" }, { status: 404 });
    }

    await prisma.analytics.delete({ where: { id: analytics.id } });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(`Error deleting analytics ${error}`);
    return NextResponse.json({ message: "Failed to delete analytics" }, { status: 500 });
  }
}
