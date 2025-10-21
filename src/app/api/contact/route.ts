import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, reason, message } = await req.json();

    // send email
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      to: process.env.EMAIL_USER,
      subject: "Contact Us form message",
      html: `
      <p>You received a new message from: ${name}</p> 
      <p>User's email: ${email}</p>
      <p>Reason of the message: ${reason}</p>
      <p>Message is the following:</p>
      <p>${message}</p>
      `,
    });

    return NextResponse.json({
      message:
        "Your message is successfully sent. Our team will review it shortly.",
    });
  } catch (err) {
    NextResponse.json({ err: "Internal server error" }, { status: 500 });
  }
}
