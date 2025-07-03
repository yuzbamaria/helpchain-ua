import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET: Prefill selected languages
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: parseInt(session.user.id) },
    select: { languageSkills: true },
  });

  return NextResponse.json({ languageSkills: user?.languageSkills ?? {} });
}

// POST: Save selected language skills
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { english, ukrainian } = await req.json();

  await prisma.user.update({
    where: { id: parseInt(session.user.id) },
    data: {
      languageSkills: { english, ukrainian },
      onboardingStep: 9,
    },
  });

  return NextResponse.json({ success: true });
}
