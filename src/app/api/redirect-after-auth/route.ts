// // src/app/api/redirect-after-auth/route.ts
// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { prisma } from "@/lib/prisma";

// export async function GET() {
//   const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

//   const session = await getServerSession(authOptions);

//   if (!session?.user?.id) {
//     return NextResponse.redirect(`${baseUrl}/signin`);
//   }

//   const user = await prisma.user.findUnique({
//     where: { id: parseInt(session.user.id) },
//     select: { onboardingStep: true },
//   });

//   if (!user) {
//     return NextResponse.redirect(`${baseUrl}/signin`);
//   }

//   const stepToPathMap: Record<number, string> = {
//     4: "/onboarding/location",
//     5: "/onboarding/profile",
//     6: "/onboarding/profession",
//     7: "/onboarding/upload-cv",
//     8: "/onboarding/language",
//     9: "/onboarding/salary",
//     10: "/onboarding/preferred-language",
//   };

//   // ✅ Якщо користувач вже завершив onboarding (тобто крок більше ніж останній)
//   if (user.onboardingStep > 10) {
//     return NextResponse.redirect(`${baseUrl}/`);
//   }

//   const nextPath = stepToPathMap[user.onboardingStep] || "/";

//   return NextResponse.redirect(`${baseUrl}${nextPath}`);
// }
