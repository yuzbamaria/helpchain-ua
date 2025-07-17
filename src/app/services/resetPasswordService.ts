import { prisma } from "@/lib/prisma";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function resetPasswordService(token: string, newPassword: string) {
  let decoded: JwtPayload;
  
  try {
    const result = jwt.verify(token, process.env.NEXTAUTH_SECRET!);
    if (typeof result === "string" || !("email" in result)) {
      throw new Error("Invalid token payload");
    }
    decoded = result as JwtPayload;
  } catch {
    throw new Error("Invalid or expired token");
  }

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
