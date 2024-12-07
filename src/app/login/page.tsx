/* eslint-disable @typescript-eslint/no-unused-expressions */
import { auth } from "@/auth";
import { LoginForm } from "@/components/client/form";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Box, Typography } from "@mui/material";

const page = async () => {
  const session = await auth();

  if (session?.user) redirect("/");
  return (
    <div className="flex justify-center items-center h-dvh">
      <Box>
        <Typography className="text-xl font-bold text-center mb-4">
          Login
        </Typography>
        <LoginForm />
        <Typography className="flex flex-col gap-4 justify-center items-center">
          <Link href="/signup">Don&apos;t have an account? Signup</Link>
        </Typography>
      </Box>
    </div>
  );
};

export default page;
