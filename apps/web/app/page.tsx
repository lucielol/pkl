"use client";

import { AppFormSignIn, AppFormSignUp } from "@/components/organism";
import { cn } from "@repo/ui/utils";
import Image from "next/image";
import { useState } from "react";

export default function AuthPage() {
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const isSignIn = mode === "signIn";

  return (
    <div
      className={cn(
        "flex min-h-screen bg-gray-50 dark:bg-background",
        isSignIn
          ? "justify-center items-center"
          : "justify-center items-start pt-16 pb-14"
      )}
    >
      <div className="sm:flex md:grid grid-cols-2 w-4/5 max-w-6xl md:min-h-[600px] rounded-2xl overflow-hidden shadow-2xl dark:shadow-gray-900">
        {/* Kiri */}
        <div className="flex flex-col justify-center gap-5 px-10 pt-10 md:pt-0 pb-12 bg-white dark:bg-sidebar">
          <div className="flex justify-between items-center pt-10">
            <h1 className="text-2xl font-semibold">LOGO</h1>
            <p className="text-sm hidden md:block">
              {isSignIn ? "Belum punya akun? " : "Sudah punya akun? "}
              <button
                type="button"
                onClick={() => setMode(isSignIn ? "signUp" : "signIn")}
                className="text-blue-500 hover:underline hover:underline-offset-2 ml-1 cursor-pointer"
              >
                {isSignIn ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>

          {isSignIn ? <AppFormSignIn /> : <AppFormSignUp />}

          <p className="text-sm md:hidden text-center">
            {isSignIn ? "Belum punya akun? " : "Sudah punya akun? "}
            <button
              type="button"
              onClick={() => setMode(isSignIn ? "signUp" : "signIn")}
              className="text-blue-500 hover:underline hover:underline-offset-2 ml-1 cursor-pointer"
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>

        {/* Kanan */}
        <div className="relative hidden md:block">
          <Image
            src={
              isSignIn
                ? "/images/kantor-signin.jpg"
                : "/images/kantor-signup.jpg"
            }
            alt="saya"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
