import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token is required." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { emailVerificationToken: token },
  });

  if (!user)
    return NextResponse.json({ error: "Invalid token." }, { status: 400 });

  return NextResponse.json({ ok: true });
}
