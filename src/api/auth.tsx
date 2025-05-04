
// 1) The shape of the data sent when registering
export type RegisterData = {
    name: string;
    email: string;
    password: string;
    bio?: string;
    venueManager?: boolean;
  };
  
  // 2) The shape of a user profile as the API returns it
  export type UserProfile = {
    id: number;
    name: string;
    email: string;
    bio?: string;
    venueManager?: boolean;
    // add avatar/banner?
  };
  
  // 3) The full response from POST /auth/register
  export type RegisterResponse = {
    data: UserProfile;
    meta: Record<string, unknown>;
  };
  
  // 4) Base URL for the v2 API
  const BASE_URL = "https://v2.api.noroff.dev";
  
  // 5) Perform the registration call
  export async function registerApi(
    payload: RegisterData
  ): Promise<RegisterResponse> {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  
    //  parse JSON so one can inspect errors
    const json = await res.json();
  
    if (!res.ok) {
      // Build a combined error message if the API returned validation errors
      const apiErrors = Array.isArray((json as any).errors)
        ? (json as any).errors.map((e: any) => e.message).join("; ")
        : null;
      const errMsg = apiErrors || (json as any).message || "Registration failed";
      throw new Error(errMsg);
    }
  
    return json as RegisterResponse;
  }
  
