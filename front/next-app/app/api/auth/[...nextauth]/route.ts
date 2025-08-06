// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: "select_account consent", // ここで毎回アカウント選択画面を表示
        },
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // ログイン後はtopページにリダイレクト
      return `${baseUrl}/top`;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
})

export { handler as GET, handler as POST }