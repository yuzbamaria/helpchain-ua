import { resetPasswordController } from "@/app/controllers/resetPasswordController";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token, newPassword } = await req.json();

  try {
    await resetPasswordController(token, newPassword);
    return NextResponse.json({ message: "Password reset successful." });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Unknown error occurred." },
      { status: 400 }
    );
  }
};
