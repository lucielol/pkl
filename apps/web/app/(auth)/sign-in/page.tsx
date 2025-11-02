import { AppFormSignIn } from "@/components/organism";
import Image from "next/image";
import Link from "next/link";

export default function SignIn() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-background">
      <div className="sm:flex md:grid grid-cols-2 w-4/5 max-w-6xl h-full md:min-h-[600px] rounded-2xl overflow-hidden shadow-2xl dark:shadow-gray-900">
        {/* Kiri */}
        <div className="flex flex-col justify-center gap-5 px-10 pt-10 md:pt-0 pb-12 bg-white dark:bg-sidebar">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold ">LOGO</h1>
            <p className="text-sm hidden md:block">
              {"Belum punya akun? "}
              <Link
                href={"/sign-up"}
                className="text-blue-500 hover:underline hover:underline-offset-2"
              >
                Sign Up
              </Link>
            </p>
          </div>
          <AppFormSignIn />
          <p className="text-sm md:hidden text-center">
            {"Belum punya akun? "}
            <Link
              href={"/sign-up"}
              className="text-blue-500 hover:underline hover:underline-offset-2"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* Kanan */}
        <div className="relative hidden md:block">
          <Image
            src="/images/kantor-signin.jpg"
            alt="saya"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
