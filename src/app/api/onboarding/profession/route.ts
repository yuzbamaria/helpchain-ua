import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET: return profession data
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: parseInt(session.user.id) },
    select: {
      currentRole: true,
      desiredRole: true,
      skills: true,
      willingToRetrain: true,
      willingToRelocate: true,
    },
  });

  return NextResponse.json(user);
}

// POST: save profession data
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const {
    currentRole,
    desiredRole,
    selectedSkills,
    willingToTrain,
    willingToRelocate,
  } = await req.json();

  const user = await prisma.user.update({
    where: { id: parseInt(session.user.id) },
    data: {
      currentRole,
      desiredRole,
      skills: selectedSkills,
      willingToRetrain: willingToTrain === "yes",
      willingToRelocate: willingToRelocate === "yes",
      onboardingStep: 7,
    },
  });

  return NextResponse.json({ success: true });
}
