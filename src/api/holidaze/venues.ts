
// 1) Shape of a single venue (only the fields you render)
export type Venue = {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  media: { url: string; alt: string }[];
  maxGuests: number;
  created: string;
  updated: string;
  meta: { wifi: boolean; parking: boolean; breakfast: boolean; pets: boolean };
  location: {
    address:   string;
    city:      string;
    zip:       string;
    country:   string;
    continent?: string;
    lat?:       number;
    lng?:       number;
  };
  owner: {
    email:  string;
    name?:  string;
    bio?:   string;
    avatar?: { url: string; alt?: string };
    banner?: { url: string; alt?: string };
  };
};

// 2) Responses
export type VenuesResponse = { data: Venue[]; meta: Record<string, unknown> };
export type CreateVenueResponse = { data: Venue; meta: Record<string, unknown> };

// 3) Payload for creating a venue
export type NewVenueData = {
  name: string;
  description: string;
  media: { url: string; alt: string }[];
  price: number;
  maxGuests: number;
  rating: number;
  meta: { wifi: boolean; parking: boolean; breakfast: boolean; pets: boolean };
  location: {
    address: string;
    city:    string;
    zip:     string;
    country: string;
    continent?: string;
    lat?:       number;
    lng?:       number;
  };
};

// 4) Base URL
const BASE_URL = "https://v2.api.noroff.dev/holidaze/venues";

// 5) Helper to attach auth headers if available
function authHeaders(): Record<string,string> {
  const headers: Record<string,string> = { "Content-Type": "application/json" };
  const token  = localStorage.getItem("token");
  const apiKey = localStorage.getItem("apiKey");
  if (token)  headers.Authorization      = `Bearer ${token}`;
  if (apiKey) headers["X-Noroff-API-Key"] = apiKey;
  return headers;
}

// 6) Fetch all venues (with auth headers so owner is included)
export async function getAllVenues(): Promise<VenuesResponse> {
  const res  = await fetch(BASE_URL, { headers: authHeaders() });
  const json = await res.json();
  if (!res.ok) throw new Error((json as any).message || "Failed to fetch venues");
  return json as VenuesResponse;
}

// 7) Fetch a single venue by ID
export async function getVenueById(id: string): Promise<{ data: Venue }> {
  const res  = await fetch(`${BASE_URL}/${id}`, { headers: authHeaders() });
  const json = await res.json();
  if (!res.ok) throw new Error((json as any).message || `Failed to fetch venue ${id}`);
  return json as { data: Venue };
}

// 8) Create a new venue
export async function createVenueApi(
  payload: NewVenueData
): Promise<CreateVenueResponse> {
  const res  = await fetch(BASE_URL, {
    method:  "POST",
    headers: authHeaders(),
    body:    JSON.stringify(payload),
  });
  const json = await res.json();
  if (!res.ok) {
    const apiErrors = Array.isArray((json as any).errors)
      ? (json as any).errors.map((e: any) => e.message).join("; ")
      : (json as any).message;
    throw new Error(apiErrors || `Failed to create venue (${res.status})`);
  }
  return json as CreateVenueResponse;
}