import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";

/**
 * NextAuth configuration for HelpChain.
 *
 * - Uses JWT strategy for stateless session handling.
 * - Adds custom onboardingStep to JWT and session.
 */

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google OAuth environment variables");
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        token: { label: "Token", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        // If token is provided (email verification link)
        if (credentials.token) {
          const user = await prisma.user.findUnique({
            where: { emailVerificationToken: credentials.token },
          });

          if (!user) return null;

          await prisma.user.update({
            where: { id: user.id },
            data: {
              emailVerified: new Date(),
              emailVerificationToken: null,
            },
          });

          return {
            ...user,
            id: String(user.id),
          } satisfies {
            id: string;
            name: string | null;
            email: string;
            image: string | null;
            onboardingStep: number;
          };
        }

        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) return null;

        if (!user.emailVerified)
          throw new Error("Please verify your email first.");

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) return null;

        return {
          ...user,
          id: String(user.id),
        } satisfies {
          id: string;
          name: string | null;
          email: string;
          image: string | null;
          onboardingStep: number;
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.onboardingStep = user.onboardingStep;
      } else if (token?.email) {
        // 🔄 Re-fetch user if already logged in
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email as string },
        });
        if (dbUser) {
          token.onboardingStep = dbUser.onboardingStep;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.onboardingStep = token.onboardingStep;
      }
      return session;
    },
  },
};
