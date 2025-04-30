import Auth0Provider from "next-auth/providers/auth0";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { emptyUser } from "../data/models";
import { nanoid } from "nanoid";
import bcrypt from "bcryptjs";
import { User } from "../data/entities";

const authOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID ?? "",
      clientSecret: process.env.AUTH0_CLIENT_SECRET ?? "",
      issuer: process.env.AUTH0_ISSUER_BASE_URL ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          value: "ayeahchanser@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }

        const currentUser = await User.findOne({
          where: { email: credentials.email },
        });
        if (!currentUser) {
          console.log("Login failed. Invalid Credentials.");
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials?.password,
          currentUser.password
        );
        if (!isPasswordValid) {
          console.log("Login failed. Invalid credentials");
          return null;
        }

        const { password, ...userWithoutPassword } = currentUser.toJSON();

        return userWithoutPassword;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        const userItem = await User.findOne({
          where: { email: user.email },
        });
        token.id = userItem.id;
        token.name = userItem.username;
        token.email = userItem.email;
        token.provider = account?.provider;
        token.role = userItem.role || "user";
      }
      return token;
    },

    async redirect({ url, baseUrl }) {
      try {
        const isRelative = url.startsWith("/");
        const isInternal = url.startsWith(baseUrl);

        if (isRelative || isInternal) {
          return url;
        }

        return baseUrl; // Prevent open redirects
      } catch (error) {
        console.error("Redirect error:", error);
        return baseUrl;
      }
    },

    async session({ session, token }) {
      // Add user info from token to session
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.provider = token.provider;
        session.user.role = token.role;
      }
      return session;
    },

    async signIn({ user, account, profile }) {
      if (account?.provider !== "credentials") {
        try {
          // find user by email
          const existingUser = await User.findOne({
            where: { email: user.email },
          });
          if (!existingUser) {
            await User.create({
              ...emptyUser,
              id: nanoid(20),
              username: user.name,
              email: user.email,
              image: user.image,
              provider: account?.provider,
              role: "user",
              verified: true,
            });
          }
        } catch (error) {
          return false;
        }
      }
      return true;
    },
  },
  secret: process.env.AUTH0_SECRET,
  pages: {
    signIn: "/login",
    newUser: "/",
  },
};

export default authOptions;
