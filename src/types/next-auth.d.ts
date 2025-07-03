import NextAuth from "next-auth";

/**
 * Extends NextAuth default types to include onboardingStep and user ID
 * in both the Session and JWT objects.
 *
 * This allows us to:
 * - Access `session.user.onboardingStep` in the client
 * - Use `token.onboardingStep` in JWT callbacks
 */


declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      onboardingStep?: number;
    };
  }

  interface User {
    onboardingStep?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    onboardingStep?: number;
  }
}
