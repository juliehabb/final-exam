const BASE_URL = "https://v2.api.noroff.dev";

export type UpdateProfileData = {
  bio?: string;
  avatar?: {
    url: string;
    alt?: string;
  };
};

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