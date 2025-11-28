import crypto from "crypto";
import { prisma } from "./prisma";
import { sendEmailVerificationUrl } from "./mail";

export async function sendVerificationEmail(user: {
  id: number;
  email: string;
}) {
  const token = crypto.randomBytes(32).toString("hex"); // 64-character token
  const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerificationToken: token,
      emailVerificationExpiry: expiry,
    },
  });

  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const verificationUrl = `${baseUrl}/verify-email/${token}`;

  await sendEmailVerificationUrl(user.email, verificationUrl);
}
