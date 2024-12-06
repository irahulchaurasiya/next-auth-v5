"use client";
import { credentialsLogin } from "@/actions/login";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const LoginForm = () => {
  const router = useRouter();

  async function doLogin(formData: FormData): Promise<void> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log(password);
    console.log(email);

    if (!email || !password) {
      toast.error("Please provide all fields");
      return;
    }

    const error = await credentialsLogin(email, password);
    if (!error) {
      {
        toast.success("Login Successfull");
        router.push("/");
      }
    } else {
      toast.error(String(error));
    }
  }
  return (
    <form className="flex flex-col gap-4" action={doLogin}>
      <Toaster />
      <TextField placeholder="Email" type="email" name="email" />
      <TextField placeholder="Password" type="password" name="password" />
      <Button
        className="w-[50%] mx-auto mb-2"
        variant="contained"
        type="submit"
      >
        Login
      </Button>
    </form>
  );
};

export { LoginForm };
