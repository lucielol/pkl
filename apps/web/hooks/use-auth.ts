"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import api from "@/lib/axios";
import Cookies from "js-cookie";

export interface User {
  email: string;
  fullname?: string;
  phone?: string;
  address?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const login = useCallback(
    async (credentials: { email: string; password: string }) => {
      try {
        setLoading(true);

        const response = await api.post("/auth/login", {
          email: credentials.email,
          password: credentials.password,
        });

        const token = response.data?.access_token;

        Cookies.set("access_token", token, {
          secure:
            process.env.NODE_ENV === "production"
              ? process.env.COOKIE_SECURE === "true"
              : false,
          sameSite: (process.env.NODE_ENV === "production"
            ? process.env.COOKIE_SAMESITE || "Strict"
            : "Lax") as "Strict" | "Lax" | "None",
          expires: 1,
        });

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setUser({ email: response.data.user.email });

        return { success: true, message: "Login berhasil" };
      } catch (error: any) {
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
    [router]
  );

  const logout = useCallback(() => {
    Cookies.remove("access_token");
    setUser(null);
    delete api.defaults.headers.common["Authorization"];
    router.push("/");
  }, [router]);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);

      const token = Cookies.get("access_token");

      if (!token) {
        setUser(null);
        return;
      }

      const authHeader = `Bearer ${token}`;

      const response = await api.get("/auth/me", {
        headers: {
          Authorization: authHeader,
        },
      });

      if (response.data && response.data.email) {
        setUser(response.data);
      } else {
        setUser(null);
      }
    } catch (err: any) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user,
    loading,
    login,
    logout,
  };
}
