const BASE_URL = "https://v2.api.noroff.dev";

/**
 * The structure of data used to update a user profile.
 * Includes optional bio and avatar information.
 */
export type UpdateProfileData = {
  bio?: string;
  avatar?: {
    url: string;
    alt?: string;
  };
  banner?: {
    url: string;
  }
};

/**
 * Updates the user profile information for the given username.
 *
 * This function sends a PUT request to the API to update the user's bio or avatar.
 * The user must be authenticated with a valid token and API key stored in localStorage.
 *
 * @param {string} name - The username of the profile to update.
 * @param {UpdateProfileData} data - An object containing the bio or avatar to update.
 * @returns {Promise<void>} A promise that resolves when the update is successful.
 * @throws {Error} If the token or API key is missing, or the update fails.
 */
export async function updateProfile(name: string, data: UpdateProfileData): Promise<void> {
  const token = localStorage.getItem("token");
  const apiKey = localStorage.getItem("apiKey");

  if (!token || !apiKey) throw new Error("Missing token or API key");

  const res = await fetch(`${BASE_URL}/holidaze/profiles/${name}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) {
    const msg = json.message || `Update failed (${res.status})`;
    throw new Error(msg);
  }
}