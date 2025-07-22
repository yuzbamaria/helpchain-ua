import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const languages = await prisma.language.findMany({
    orderBy: { name: "asc" },
  });

  const options = languages.map((lang) => ({
    label: lang.name,
    value: String(lang.id),
  }));

  return NextResponse.json({ options });
}
