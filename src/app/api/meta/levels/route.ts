import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const levels = await prisma.languageLevel.findMany({
    orderBy: { id: "asc" },
  });

  const options = levels.map((level) => ({
    label: level.name,
    value: String(level.id),
  }));

  return NextResponse.json({ options });
}
