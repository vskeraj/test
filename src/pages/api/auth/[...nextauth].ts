import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_local_dev",
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "fake_id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "fake_secret",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: { email: { type: "text" }, password: { type: "password" } },
      async authorize(credentials) {
        await dbConnect();
        const user = await (User as any).findOne({ email: credentials?.email });
        if (user && credentials?.password && bcrypt.compareSync(credentials.password, user.password)) {
          return { id: user._id.toString(), email: user.email, name: user.name, role: user.role || "user" };
        }
        return null; // For assignment test
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    }
  },
  pages: { signIn: '/login' }
});
