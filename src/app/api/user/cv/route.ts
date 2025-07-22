import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cv = await prisma.cv.findFirst({
    where: {
      userId: parseInt(session.user.id),
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!cv) {
    return NextResponse.json({ error: "CV not found" }, { status: 404 });
  }

  return NextResponse.json({ fileUrl: cv.fileUrl });
}
