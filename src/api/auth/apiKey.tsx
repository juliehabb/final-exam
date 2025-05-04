// 1) Response from POST /auth/create-api-key
export type ApiKeyResponse = {
    data: { key: string };
    meta: Record<string, unknown>;
  };
  
  const BASE_URL = "https://v2.api.noroff.dev";
  
  // 2) Generate an API key (requires your JWT in the Authorization header)
  export async function createApiKey(jwt: string): Promise<ApiKeyResponse> {
    const res = await fetch(`${BASE_URL}/auth/create-api-key`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type":  "application/json",
      },
      // send an empty object so body-parser always sees valid JSON:
      body: JSON.stringify({}),
    });
  
    const json = await res.json();
    console.log("createApiKey response:", res.status, json);
  
    if (!res.ok) {
      const errMsg = (json as any).message || `HTTP ${res.status}`;
      throw new Error(errMsg);
    }
  
    return json as ApiKeyResponse;
  }
  