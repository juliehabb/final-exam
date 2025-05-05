
// Shape of a single venue (only the fields rendered)
export type Venue = {
  id: string;
  name: string;
  price: number;
  rating: number;
  media: { url: string; alt: string }[];
  location: { city: string; country: string };
  meta: { wifi: boolean; parking: boolean; breakfast: boolean; pets: boolean };
};

// Response from GET /holidaze/venues
export type VenuesResponse = {
  data: Venue[];
  meta: Record<string, unknown>;
};

// Data one send when creating a venue
export type NewVenueData = {
  name: string;
  description: string;
  media: string[];       // array of image URLs
  price: number;
  maxGuests: number;
  rating: number;
  meta: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  };
  location: {
    address: string;
    city: string;
    zip: string;
    country: string;
    continent?: string;
    lat?: number;
    lng?: number;
  };
};

// Response from POST /holidaze/venues
export type CreateVenueResponse = {
  data: Venue;
  meta: Record<string, unknown>;
};

const BASE_URL = "https://v2.api.noroff.dev";

// Fetch all venues
export async function getAllVenues(): Promise<VenuesResponse> {
  const res = await fetch(`${BASE_URL}/holidaze/venues`);
  const json = await res.json();
  if (!res.ok) {
    const msg = (json as any).message || `Failed to fetch venues (${res.status})`;
    throw new Error(msg);
  }
  return json as VenuesResponse;
}

// Create a new venue (requires JWT + API key)
export async function createVenueApi(
  payload: NewVenueData
): Promise<CreateVenueResponse> {
  const token  = localStorage.getItem("token");
  const apiKey = localStorage.getItem("apiKey") || "";

  const res = await fetch(`${BASE_URL}/holidaze/venues`, {
    method: "POST",
    headers: {
      "Content-Type":     "application/json",
      Authorization:      `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json();
  if (!res.ok) {
    const msg =
      Array.isArray((json as any).errors)
        ? (json as any).errors.map((e: any) => e.message).join("; ")
        : (json as any).message || `Failed to create venue (${res.status})`;
    throw new Error(msg);
  }
  return json as CreateVenueResponse;
}
