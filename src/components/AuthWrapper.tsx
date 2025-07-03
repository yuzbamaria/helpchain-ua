"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

/**
 * AuthWrapper wraps the app in a NextAuth SessionProvider.
 *
 * This enables:
 * - Usage of `useSession()` in any client component
 * - Access to authenticated user data (e.g. id, email, onboardingStep)
 * - Conditional rendering based on authentication state
 *
 * 🔔 Note: Without SessionProvider, useSession() will not work.
 */

export default function AuthWrapper({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
