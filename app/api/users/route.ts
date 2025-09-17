// app/api/users/route.ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const GET = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email } = body;

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    return NextResponse.json(user?.name);
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  const { name, email, password } = await req.json();

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        accounts: {
          create: [
            { provider: "FACEBOOK" },
            { provider: "TAYOG" },
            { provider: "X" },
            { provider: "LINKEDIN" },
            { provider: "INSTAGRAM" },
          ],
        },
      },
      include: { accounts: true }, // return accounts too
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
};
