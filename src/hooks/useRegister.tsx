import { useState } from "react";
import { registerApi, RegisterData, RegisterResponse } from "../api/auth/register";


/**
 * A custom hook to handle user registration using the Noroff API.
 *
 * @returns {Object} - An object containing:
 *   - register: Function to register a user
 *   - loading: Boolean that is true while registration is happening
 *   - error: String if there's an error, otherwise null
 */
export function useRegister() {
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState<string | null>(null);
  
    /**
   * Registers a new user with the provided data.
   *
   * @param {RegisterData} data - The user info: name, email, password, etc.
   * @returns {Promise<RegisterResponse>} - The response from the API
   * @throws Will throw an error if the registration fails
   */
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