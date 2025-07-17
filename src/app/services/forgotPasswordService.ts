// business logic: token generation, db update, email sending

import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { sendPasswordResetEmail } from "@/lib/mail";
import { NextResponse } from "next/server";

export async function passwordResetService(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ message: "If user exists, email sent" });
  }

  const token = jwt.sign({ email }, process.env.NEXTAUTH_SECRET!, {
    expiresIn: "15m",
  });

  await prisma.user.update({
    where: { email },
    data: {
      resetPasswordToken: token,
      resetPasswordTokenExpiry: new Date(Date.now() + 15 * 60 * 1000),
    },
  });

  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const resetUrl = `${baseUrl}/reset-password?token=${token}`;

  await sendPasswordResetEmail(email, resetUrl);
};
