import { useState } from "react";
import { registerApi, RegisterData, RegisterResponse } from "../api/auth";

export function useRegister() {
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState<string | null>(null);
  
    async function register(data: RegisterData): Promise<RegisterResponse> {
      setLoading(true);
      setError(null);
      try {
        return await registerApi(data);
      } catch (err: any) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    }
  
    return { register, loading, error };
  }