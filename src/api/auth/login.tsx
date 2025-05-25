/**
 * This is the shape of the login information you need to send to the API.
 * You provide an email and a password.
 */
export type LoginData = {
    email: string;
    password: string;
  };
  
  /**
 * This is the structure of the response you get when the login is successful.
 * It includes your access token, name, and optional profile info.
 */
  export type LoginResponse = {
    data: {
      accessToken: string;          
      name: string;
      email: string;
      avatar?: { url: string; alt?: string };
      banner?: { url: string; alt?: string };
      venueManager?: boolean;
    };
    meta: Record<string, unknown>;
  };
  
  const BASE_URL = "https://v2.api.noroff.dev";
  
  /**
 * Logs a user into the system using email and password.
 *
 * @param {LoginData} payload - An object with your email and password.
 * @returns {Promise<LoginResponse>} - If successful, returns info like your token and name.
 * @throws {Error} - If login fails, an error message is shown.
 *
 * Example:
 * ```ts
 * const credentials = { email: "your@email.com", password: "password123" };
 * const userInfo = await loginApi(credentials);
 * console.log(userInfo.data.accessToken); // this is your login token
 * ```
 */
  export async function loginApi(payload: LoginData): Promise<LoginResponse> {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  
    const json = await res.json();
  
    if (!res.ok) {
      const apiErrors = Array.isArray((json as any).errors)
        ? (json as any).errors.map((e: any) => e.message).join("; ")
        : null;
      const errMsg = apiErrors || (json as any).message || "Login failed";
      throw new Error(errMsg);
    }
  
    return json as LoginResponse;
  }
  