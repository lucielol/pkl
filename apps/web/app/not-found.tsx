"use client";

import { Button } from "@repo/ui/components/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-50 dark:bg-background text-center">
      <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">
        Oops! Halaman Tidak Ditemukan
      </h2>
      <p className="text-gray-400 mb-6">
        {"Silakan periksa kembali URL Anda atau kembali ke "}
        <Link
          href="/"
          className="underline bg-transparent underline-offset-1 cursor-pointer transition-colors duration-200 text-gray-400 hover:text-white"
        >
          halaman utama.
        </Link>
      </p>
      <Button
        onClick={() => router.back()}
        className="cursor-pointer bg-blue-500 hover:bg-blue-700 transition-colors duration-200 text-white"
      >
        Kembali
      </Button>
    </div>
  );
}
