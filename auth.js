import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import User from "@/models/user";
import { connectDB } from "@/utils/database";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        const sessionUser = await User.findOne({ email: session.user.email });
        if (!sessionUser) {
          throw new Error("User not found in database");
        }
        session.user.id = sessionUser._id.toString();
        return session;
      } catch (error) {
        console.error("Session callback error:", error);
        return session;
      }
    },
    async signIn({ profile }) {
      try {
        await connectDB();

        if (!profile?.email) {
          throw new Error("No email provided by Google");
        }

        // check if user exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username:
              profile.name?.replace(" ", "").toLowerCase() ||
              profile.email.split("@")[0],
            image: profile.picture || "",
          });
        }

        return true;
      } catch (error) {
        console.error("SignIn callback error:", error);
        return false; // This will trigger the "Access Denied" error
      }
    },
  },
});
