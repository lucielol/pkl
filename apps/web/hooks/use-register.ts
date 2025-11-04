"use client";

import { useCallback, useState } from "react";
import api from "@/lib/axios";
import { formSignUpSchema } from "@/validator";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const register = useCallback(
    async (data: formSignUpSchema) => {
      try {
        setLoading(true);
        await api.post("/auth/register", data);
        setSuccess(true);
        setMessage("Register berhasil");
        return { success: true, message: "Register berhasil" };
      } catch (error: any) {
        setError(true);
        setMessage(
          error.response?.data?.detail || "Register gagal, periksa kembali data"
        );
        return {
          success: false,
          message,
        };
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, setSuccess]
  );

  return { register, loading, error, success, message };
}
