import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";
import type { NextAuthConfig } from "next-auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const config = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (credentials == null) return null;

        //Find user in database
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });

        // Check if user exists and password matches
        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password
          );

          //if password is correct then return user
          if (isMatch)
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
        }
        //if user does not exist or password does not match return null
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, trigger, token }: any) {
      // Ensure session contains user details
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        role: token.role,
      };
      session.user.role = token.role;
      session.user.name = token.name;
      return session;
    },
    async jwt({ token, user, trigger, session }: any) {
      //assign user fields to the token
      if (user) {
        token.id = user.id;
        token.role = user.role;

        // if user has no name, then use email
        if (user.name === "NO_NAME") {
          token.name = user.email ? user.email.split("@")[0] : "defaultName";

          //update database to reflect token name
          try {
            await prisma.user.update({
              where: { id: user.id },
              data: { name: token.name },
            });
          } catch (error) {
            console.error("Failed to update user name:", error);
          }
        }
      }

      return token;
    },
    authorized({ request, auth }: any) {
      // check for existing session cart cookie
      if (!request.cookies.get("sessionCartId")) {
        // generate new session cart id cookie
        const sessionCartId = crypto.randomUUID();

        // clone the request headers
        const newRequestHeaders = new Headers(request.headers);

        // create new response and add the new headers
        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders,
          },
        });

        // set newly generated sessionCartId in the response cookies
        response.cookies.set("sessionCartId", sessionCartId);
        return response;
      } else {
        return true;
      }
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
