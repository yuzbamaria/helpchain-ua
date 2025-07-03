import CredentialsProvider from "next-auth/providers/credentials";
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

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          onboardingStep: user.onboardingStep,
        };
      },
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
        console.log("from auth.ts - JWT callback (login):", token);
      } else if (token?.email) {
        // 🔄 Re-fetch user if already logged in
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email as string },
        });
        if (dbUser) {
          token.onboardingStep = dbUser.onboardingStep;
          console.log("from auth.ts - JWT callback (refetch):", token);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.onboardingStep = token.onboardingStep;
      }
      console.log("from auth.ts - Session callback:", session);
      return session;
    },
  },
};
