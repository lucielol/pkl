import { AppFormSignUp } from "@/components/organism";
import Image from "next/image";
import Link from "next/link";

export default function SignUp() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-background">
      <div className="sm:flex md:grid grid-cols-2 w-4/5 max-w-6xl h-full md:min-h-[700px] rounded-2xl overflow-hidden shadow-2xl dark:shadow-gray-900">
        {/* Kiri */}
        <div className="flex flex-col justify-center gap-0 md:gap-5 px-10 md:pt-0 pb-6 bg-white dark:bg-sidebar">
          <div className="flex justify-between items-center pt-5">
            <h1 className="text-2xl font-semibold">LOGO</h1>
            <p className="text-sm hidden md:block">
              Sudah punya akun?{" "}
              <Link
                href={"/sign-in"}
                className="text-blue-500 hover:underline hover:underline-offset-2"
              >
                Sign In
              </Link>
            </p>
          </div>
          <AppFormSignUp />
          <p className="text-sm md:hidden text-center">
            {"Belum punya akun? "}
            <Link
              href={"/sign-in"}
              className="text-blue-500 hover:underline hover:underline-offset-2"
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Kanan */}
        <div className="relative hidden md:block">
          <Image
            src="/images/kantor-signup.jpg"
            alt="saya"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
