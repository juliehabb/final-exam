import { useState } from "react";
import { loginApi, LoginData, LoginResponse } from "../api/auth/login";
import { createApiKey }     from "../api/auth/apiKey";

 /**
 * A custom hook to handle user login and API key creation.
 *
 * @returns {Object} - An object containing:
 *   - login: Function to login the user and create an API key
 *   - loading: Boolean showing if login is in progress
 *   - error: Error message if something goes wrong
 */
export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

 
/**
   * Logs in the user using their email and password, then generates an API key.
   *
   * @param {LoginData} data - Contains email and password
   * @returns {Promise<{ loginResult: LoginResponse, apiKey: string }>} - login response and API key
   * @throws Will throw an error if login or API key generation fails
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
