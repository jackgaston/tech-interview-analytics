/**
 * NextAuth Type Extensions
 * 
 * This module extends the default NextAuth types to include custom properties
 * needed for the CRM dashboard, specifically the user role system.
 * 
 * The extensions ensure type safety when working with authentication
 * throughout the application.
 */

import { DefaultSession } from "next-auth";
import { UserRole } from ".";

declare module "next-auth" {
  /**
   * Extends the default session type to include user role
   * This makes the role available in useSession() hooks and getSession() calls
   */
  interface Session {
    user: {
      role: UserRole;  // User's role (ADMIN or SALES_REP)
    } & DefaultSession["user"]
  }

  /**
   * Extends the default user type to include role
   * This affects the user object stored in the database
   */
  interface User {
    role: UserRole;  // User's role in the system
  }
}

declare module "next-auth/jwt" {
  /**
   * Extends the JWT type to include user role
   * This makes the role available in the encoded JWT token
   */
  interface JWT {
    role: UserRole;  // User's role for token-based authentication
  }
} 