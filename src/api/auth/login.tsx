// 1) Credentials you send when logging in
export type LoginData = {
    email: string;
    password: string;
  };
  
  // 2) Response from POST /auth/login
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
  
  // 3) Perform the login call
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
  