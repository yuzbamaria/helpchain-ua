import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { NextResponse } from "next/server";
import validator from "validator";
import { isPasswordValid } from "@/utils/validatePassword";
import { sendEmailVerificationUrl } from "@/lib/mail";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required." },
      { status: 400 }
    );
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists." },
      { status: 400 }
    );
  }

  if (!isPasswordValid(password)) {
    return NextResponse.json(
      { message: "Password does not meet complexity requirements." },
      { status: 400 }
    );
  }

  if (!validator.isEmail(email)) {
    return NextResponse.json(
      { message: "Invalid email format" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const token = crypto.randomBytes(32).toString("hex"); // 64-character hex string
  const emailVerificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      emailVerificationToken: token,
      emailVerificationExpiry: emailVerificationExpiry,
      // onboardingStep: 4, // Assuming the user starts at step 4 after registration
    },
  });

  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const emailVerificationUrl = `${baseUrl}/verify-email?token=${token}`;
  
  await sendEmailVerificationUrl(email, emailVerificationUrl)

  return NextResponse.json({ message: "User created", user }, { status: 201 });
}
