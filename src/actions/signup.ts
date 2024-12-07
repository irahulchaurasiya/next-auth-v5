"use server";
import { User } from "@/models/userModel";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/utils";
import { signIn } from "@/auth";

const credentialsSignIn = async (
  name: string,
  email: string,
  password: string
) => {
  await connectToDatabase();

  const user = await User.findOne({ email });

  if (user) {
    return new Error("User already exists.");
  }

  const hashedpassword = await hash(password, 10);

  await User.create({
    name,
    email,
    password: hashedpassword,
  });

  redirect("/login");
};

const githubSignIn = async () => {
  await signIn("github");
};

export { credentialsSignIn, githubSignIn };
