import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: parseInt(session.user.id) },
    select: {
      firstName: true,
      lastName: true,
      age: true,
      gender: true,
    },
  });

  return NextResponse.json(user);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { firstName, lastName, age, gender } = await req.json();
  console.log("Received profile data:", { firstName, lastName });

  await prisma.user.update({
    where: { id: parseInt(session.user.id) },
    data: {
      firstName,
      lastName,
      age,
      gender,
      onboardingStep: 6,
    },
  });

  return NextResponse.json({ success: true });
}
