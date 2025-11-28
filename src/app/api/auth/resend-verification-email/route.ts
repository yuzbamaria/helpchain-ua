import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { sendVerificationEmail } from "@/lib/sendVerificationEmail";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  await sendVerificationEmail(user);

  return NextResponse.json(
    { message: "Verification email sent" },
    { status: 200 }
  );
}
