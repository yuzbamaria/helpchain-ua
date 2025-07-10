import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    console.log("API route GET called"); 
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

    const user = await prisma.user.findUnique({
        where: { id : parseInt(session.user.id) }
    });

    console.log(user)
    return NextResponse.json({ user });
}