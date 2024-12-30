"use client";

import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Loading from "@/src/components/UI/Loading";
import TWInput from "@/src/components/UI/form/TWInput";
import TWForm from "@/src/components/UI/form/TWForm";
import { useUser } from "@/src/context/user.provider";
import { useLoginUser } from "@/src/hooks/auth.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import loginValidationSchema from "@/src/schemas/login.schema";

export type FormInput = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    mutate: handleLoginUser,
    isPending,
    isSuccess,
    data,
  } = useLoginUser();
  const { setIsLoading } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get("redirect");
  const onsubmit = (data: FormInput) => {
    handleLoginUser(data);
  };

  useEffect(() => {
    if (!isPending && isSuccess && data?.success) {
      if (redirect) {
        setIsLoading(true);
        router.push(redirect);
      } else {
        setIsLoading(true);
        router.push("/dashboard/admin");
      }
    }
  }, [isPending, isSuccess]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {isPending && <Loading />}
      <div className="flex flex-col md:flex-row items-center justify-center max-w-4xl w-full">
        {/* Left Section: Facebook-like Branding */}
        <div className="flex flex-col justify-center text-center md:text-left md:w-1/2 p-10 space-y-4">
          <div>
            <Image
              alt=""
              height={300}
              src="https://i.ibb.co.com/XWhj4vF/DALL-E-2024-12-31-00-23-47-A-professional-and-creative-logo-for-a-software-engineer-named-Anik-Roy-T.webp"
              width={300}
            />
          </div>
         
        </div>

        {/* Right Section: Login Form */}
        <div className="p-8 rounded-lg shadow-md md:w-1/2 w-full">
          <TWForm
          resolver={zodResolver(loginValidationSchema)}
          onSubmit={onsubmit}
          >
            <div className="my-3">
              <TWInput label="Email" name="email" type="email" />
            </div>
            <div className="my-3">
              <TWInput label="Password" name="password" type="password" />
            </div>

            {/* Forgot Password link */}
            <div className="text-right">
              <Link
                className="text-sm text-default-500 hover:text-default-700"
                href="/forgotPassword"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Login
            </Button>
          </TWForm>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
