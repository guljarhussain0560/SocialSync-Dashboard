import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

async function getUserId(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    throw new Error('Unauthorized: No user session found');
  }
  return session.user.id;
}

export async function GET(request: Request) {
  try {
    const userId = await getUserId(request);
    const accounts = await prisma.account.findMany({
      where: { userId },
    });
    return NextResponse.json(accounts);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    return new NextResponse(JSON.stringify({ message: 'Failed to fetch accounts' }), { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const userId = await getUserId(request);
    const body = await request.json();
    const { provider } = body;

    // Find the account
    const account = await prisma.account.findFirst({
      where: { userId, provider },
    });

    if (!account) {
      return new NextResponse(JSON.stringify({ message: 'Account not found' }), { status: 404 });
    }

    // Toggle the isConnected status
    const updatedAccount = await prisma.account.update({
      where: { id: account.id },
      data: { isConnected: !account.isConnected },
    });

    return NextResponse.json(updatedAccount);
  } catch (error) {
    console.error('Error toggling account connection:', error);
    return new NextResponse(JSON.stringify({ message: 'Failed to toggle connection' }), { status: 500 });
  }
}