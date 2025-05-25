import { useState } from "react";
import { loginApi, LoginData, LoginResponse } from "../api/auth/login";
import { createApiKey }     from "../api/auth/apiKey";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  /**
   * Logs in the user and then creates an API key.
   * @returns the login response and the newly created API key
   */
  async function login(
    data: LoginData
  ): Promise<{ loginResult: LoginResponse; apiKey: string }> {
    setLoading(true);
    setError(null);
    try {
      // 1) login to get the JWT
      const loginResult = await loginApi(data);
      const token       = loginResult.data.accessToken;

      // 2) Use that JWT to create API key
      const keyResult = await createApiKey(token);
      const apiKey    = keyResult.data.key;

      return { loginResult, apiKey };
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { login, loading, error };
}
