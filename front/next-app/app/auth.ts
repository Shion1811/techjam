import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  url: process.env.NEXTAUTH_URL,
};
export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);