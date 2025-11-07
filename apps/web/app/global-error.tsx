"use client";

import { ErrorProps } from "@/types";
import { useEffect } from "react";

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg dark:bg-gray-900">
        {/* Ikon untuk visual */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50">
          {/* SVG Ikon Peringatan */}
          <svg
            className="h-6 w-6 text-red-600 dark:text-red-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z"
            />
          </svg>
        </div>

        <h2 className="mb-2 text-2xl font-bold text-gray-800 dark:text-gray-100">
          Oops, Terjadi Kesalahan!
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Sesuatu yang tidak terduga terjadi. Silakan coba lagi.
        </p>

        {/* Menampilkan kode error di production untuk referensi */}
        {error.digest && (
          <p className="mb-6 text-sm text-gray-500">
            Kode Error:{" "}
            <code className="rounded bg-gray-200 p-1 dark:bg-gray-700">
              {error.digest}
            </code>
          </p>
        )}

        <button
          onClick={() => reset()}
          className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Coba Lagi
        </button>
      </div>
    </main>
  );
}
