import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// POST — зберігає локацію та крок
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { city } = await req.json();

  console.log("City received:", city);

  await prisma.user.update({
    where: { id: parseInt(session.user.id) },
    data: {
      city,
      onboardingStep: 5, // move to next step
    },
  });

  return NextResponse.json({ success: true });
}

// 🆕 GET — повертає збережене місто
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: parseInt(session.user.id) },
    select: { city: true },
  });

  return NextResponse.json({ city: user?.city || "" });
}
