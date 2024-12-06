"use client";

import Link from "next/link";
import { credentialsSignIn } from "@/actions/signup";
import { useRouter } from "next/navigation";
import { Box, Button, TextField, Typography } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

const SignupForm = () => {
  const router = useRouter();

  const signUp = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password || !name) {
      toast.error("Please provide all fields");
      return;
    }

    //connection with database
    const error = await credentialsSignIn(name, email, password);
    if (!error) {
      {
        toast.success("Signin Successfull");
        router.push("/login");
      }
    } else {
      toast.error("Signin failed");
    }
  };
  return (
    <Box>
      <Toaster />
      <Typography className="text-xl font-bold text-center mb-4">
        Signup
      </Typography>
      <Box>
        <form className="flex flex-col gap-4" action={signUp}>
          <TextField placeholder="Name" name="name" type="text" />
          <TextField placeholder="Email" name="email" type="email" />
          <TextField placeholder="Password" name="password" type="password" />
          <Button
            className="w-[50%] mx-auto mb-2"
            variant="contained"
            type="submit"
          >
            Signup
          </Button>
        </form>
      </Box>
      <Box className="flex flex-col justify-center items-center gap-4">
        <span>Or</span>
        <form action="">
          <Button type="submit" className="bg-gray-800 text-white">
            Signup with github
          </Button>
        </form>
        <Link href="/login">Already have an account? Login</Link>
      </Box>
    </Box>
  );
};

export { SignupForm };
