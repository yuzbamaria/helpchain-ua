import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function resetPasswordService(token: string, newPassword: string) {
  let decoded: any;

  try {
    decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!);
  } catch (err) {
    throw new Error("Invalid or expired token");
  };

  const user = await prisma.user.findUnique({
    where: { email: decoded.email },
  });

  if (
    !user ||
    user.resetPasswordToken !== token ||
    user.resetPasswordTokenExpiry! < new Date()
  ) {
    throw new Error("Invalid or expired reset token");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { email: decoded.email },
    data: {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordTokenExpiry: null,
    },
  });

}