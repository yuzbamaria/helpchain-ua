import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  const user = await prisma.user.findUnique({
    where: { emailVerificationToken: token },
  });

  if (!user)
    return NextResponse.json({ error: "Invalid token." }, { status: 400 });

  return NextResponse.json({ ok: true });
}
