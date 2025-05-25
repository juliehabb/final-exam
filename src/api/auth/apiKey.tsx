/**
 * This is the format of the response we get when we create an API key.
 * It has a 'data' part that includes the key, and a 'meta' part with extra info.
 */
export type ApiKeyResponse = {
    data: { key: string };
    meta: Record<string, unknown>;
  };
  
  const BASE_URL = "https://v2.api.noroff.dev";
  
  /**
 * This function creates a new API key for your user.
 * You need to already be logged in and have a JWT token.
 *
 * @param {string} jwt - Your login token (JWT) which proves you're allowed to do this.
 * @returns {Promise<ApiKeyResponse>} - It gives back the API key if everything works.
 * @throws {Error} - If something goes wrong (like you're not logged in), it will show an error.
 *
 * Example:
 * ```ts
 * const keyInfo = await createApiKey("your-jwt-token-here");
 * console.log(keyInfo.data.key); // shows the new API key
 * ```
 */
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
  
    if (!res.ok) {
      const errMsg = (json as any).message || `HTTP ${res.status}`;
      throw new Error(errMsg);
    }
  
    return json as ApiKeyResponse;
  }
  