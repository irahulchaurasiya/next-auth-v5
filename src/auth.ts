import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { User } from "./models/userModel";
import { compare } from "bcryptjs";
import { connectToDatabase } from "./lib/utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;
        // console.log(email, password);

        if (!email || !password) {
          throw new CredentialsSignin({
            cause: "Please provide both email and password",
          });
        }

        //connection with database here
        await connectToDatabase();

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
          throw new CredentialsSignin({ cause: "Invalid email or password" });
        }

        if (!user.password) {
          throw new CredentialsSignin({ cause: "Invalid email or password" });
        }

        const isMatch = await compare(password, user.password);

        if (!isMatch) {
          throw new CredentialsSignin({ cause: "Invalid email or password" });
        }

        return { name: user.name, email: user.email, id: user._id };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
