/* eslint-disable @typescript-eslint/no-unused-expressions */
import { auth } from "@/auth";
import { LoginForm } from "@/components/client/form";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Box, Button, Typography } from "@mui/material";
import { githubLogin } from "@/actions/login";

const page = async () => {
  const session = await auth();

  const loginGithub = async () => {
    "use server";
    await githubLogin();
  };

  if (session?.user) redirect("/");
  return (
    <div className="flex justify-center items-center h-dvh">
      <Box>
        <Typography className="text-xl font-bold text-center mb-4">
          Login
        </Typography>
        <LoginForm />
        <Typography className="flex flex-col gap-4 justify-center items-center">
          <span>Or </span>
          <form action={loginGithub}>
            <Button type="submit" className="bg-gray-800 text-white">
              Login with github
            </Button>
          </form>
          <Link href="/signup">Don&apos;t have an account? Signup</Link>
        </Typography>
      </Box>
    </div>
  );
};

export default page;
