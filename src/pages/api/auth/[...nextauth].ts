import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

// Only register an OAuth provider when its credentials are actually configured,
// so the app never ships with placeholder "fake" credentials.
const oauthProviders: NextAuthOptions["providers"] = [];
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  oauthProviders.push(GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }));
}
if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
  oauthProviders.push(FacebookProvider({
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  }));
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_local_dev",
  providers: [
    ...oauthProviders,
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
    async jwt({ token, user, account, trigger, session }) {
      if (user) {
        if (account && account.provider !== "credentials") {
          // OAuth sign-in: ensure a Mongo user exists so favorites/orders
          // (which key off a Mongo _id) work for OAuth users too.
          await dbConnect();
          const dbUser = await (User as any).findOneAndUpdate(
            { email: user.email },
            { $setOnInsert: { email: user.email, name: user.name, role: "user" } },
            { upsert: true, new: true }
          );
          token.id = dbUser._id.toString();
          token.role = dbUser.role;
          token.name = dbUser.name;
        } else {
          token.role = (user as any).role;
          token.id = user.id;
          token.name = (user as any).name;
        }
      }
      // Client called useSession().update({ name }) after a profile save.
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
        session.user.name = token.name as string;
      }
      return session;
    }
  },
  pages: { signIn: '/login' }
};

export default NextAuth(authOptions);
