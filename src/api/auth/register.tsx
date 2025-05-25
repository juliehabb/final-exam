/**
 * This is the shape of the data you need to send when registering.
 * You must include name, email, and password.
 * You can optionally include a bio and specify if the user is a venue manager.
 */
export type RegisterData = {
    name: string;
    email: string;
    password: string;
    bio?: string;
    venueManager?: boolean;
  };
  
  /**
 * This is what the API returns about the newly created user.
 */
  export type UserProfile = {
    id: number;
    name: string;
    email: string;
    bio?: string;
    venueManager?: boolean;
  };
  
 /**
 * This is the full response returned by the API when registration is successful.
 */
  export type RegisterResponse = {
    data: UserProfile;
    meta: Record<string, unknown>;
  };
  
  const BASE_URL = "https://v2.api.noroff.dev";
  
  /**
 * Registers a new user with the system.
 *
 * @param {RegisterData} payload - An object with name, email, password, and optional bio or manager status.
 * @returns {Promise<RegisterResponse>} - Returns info about the new user if registration is successful.
 * @throws {Error} - If registration fails, an error message is shown.
 *
 * Example:
 * ```ts
 * const newUser = {
 *   name: "NewUser",
 *   email: "newuser@stud.noroff.no",
 *   password: "securePass123",
 *   venueManager: true
 * };
 * const response = await registerApi(newUser);
 * console.log(response.data.name); // "NewUser"
 * ```
 */
  export async function registerApi(
    payload: RegisterData
  ): Promise<RegisterResponse> {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  
    const json = await res.json();
  
    if (!res.ok) {
      const apiErrors = Array.isArray((json as any).errors)
        ? (json as any).errors.map((e: any) => e.message).join("; ")
        : null;
      const errMsg = apiErrors || (json as any).message || "Registration failed";
      throw new Error(errMsg);
    }
  
    return json as RegisterResponse;
  }