// the route handles the HTTP request & response: sending the reset email with the token:
// find user by email, generate a reset token, store token in DB, emails reset link (/reset-password?token=...)

import { passwordResetController } from "@/app/controllers/forgotPasswordControlle";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  try {
    await passwordResetController(email);
    return NextResponse.json({ message: "Check your email for reset link." });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  };
};
