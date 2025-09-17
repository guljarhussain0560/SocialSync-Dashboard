// app/api/users/route.ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const GET = async (req: NextRequest) => {
  try {
    const email = req.nextUrl.searchParams.get("email");
    if (!email) return NextResponse.json({ message: "Missing email" }, { status: 400 });

    const user = await prisma.user.findFirst({ where: { email } });
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error in GET /api/users:", error);
    return NextResponse.json({ message: "Failed" }, { status: 500 });
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
