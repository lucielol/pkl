"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import Cookies from "js-cookie";
import { useApi } from "@/hooks";
import { AxiosError } from "axios";
import { env, isProduction } from "@/config";
import { STORAGE_KEYS } from "@/constants";
import { User } from "@/types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { fetcher } = useApi();
  const router = useRouter();
  const hasFetched = useRef(false);

  const login = useCallback(
    async (credentials: { email: string; password: string }) => {
      try {
        setLoading(true);

        const response = await fetcher<{ access_token: string; user: User }>(
          "/auth/login",
          {
            method: "POST",
            data: {
              email: credentials.email,
              password: credentials.password,
            },
          }
        );

        const token = response.access_token;
        Cookies.set(STORAGE_KEYS.token, token, {
          secure: isProduction ? env.auth.cookie_secure === "true" : false,
          sameSite: (isProduction
            ? env.auth.cookie_samesite || "Strict"
            : "Lax") as "Strict" | "Lax" | "None",
          expires: 1,
        });

        setUser(response.user);
        return { success: true, message: "Login berhasil" };
      } catch (err) {
        const error = err as AxiosError<any>;
        const message =
          error.response?.data?.detail ||
          error.response?.data?.message ||
          "Login gagal, periksa kembali email dan password";

        return {
          success: false,
          message,
        };
      } finally {
        setLoading(false);
      }
    },
    [fetcher]
  );

  const logout = useCallback(() => {
    Cookies.remove(STORAGE_KEYS.token);
    setUser(null);
    router.push("/");
  }, [router]);

  const fetchUser = useCallback(async () => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    try {
      setLoading(true);

      const token = Cookies.get(STORAGE_KEYS.token);

      if (!token) {
        setUser(null);
        return;
      }

      const data = await fetcher<User>("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data && data.email) {
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.warn("Fetch user gagal:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, login, logout };
}
