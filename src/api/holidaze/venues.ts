import type { Booking } from "./bookings"

// 1) Shape of a single venue (only the fields rendered + owner.email)
export type Venue = {
  id: string
  name: string
  description: string
  price: number
  rating: number
  media: { url: string; alt: string }[]
  maxGuests: number
  created: string
  updated: string
  meta: { wifi: boolean; parking: boolean; breakfast: boolean; pets: boolean }
  location: {
    address: string
    city: string
    zip: string
    country: string
    continent?: string
    lat?: number
    lng?: number
  }
  owner: {
    email: string
    name?: string
    bio?: string
    avatar?: { url: string; alt?: string }
    banner?: { url: string; alt?: string }
  };

  bookings?: Booking[];
}

// 2) Responses
export type VenuesResponse = { data: Venue[]; meta: Record<string, unknown> }
export type CreateVenueResponse = { data: Venue; meta: Record<string, unknown> }

// 3) Payload for creating a venue
export type NewVenueData = {
  name: string
  description: string
  media: { url: string; alt: string }[]
  price: number
  maxGuests: number
  rating: number
  meta: { wifi: boolean; parking: boolean; breakfast: boolean; pets: boolean }
  location: {
    address: string
    city: string
    zip: string
    country: string
    continent?: string
    lat?: number
    lng?: number
  }
}

// 4) Base path
const BASE = "https://v2.api.noroff.dev/holidaze"

// 5) Helper to attach auth headers if available
function authHeaders(): Record<string,string> {
  const h: Record<string,string> = { "Content-Type": "application/json" }
  const token = localStorage.getItem("token")
  const key   = localStorage.getItem("apiKey")
  if (token) h.Authorization      = `Bearer ${token}`
  if (key)   h["X-Noroff-API-Key"] = key
  return h
}

// 6) Fetch all venues
export async function getAllVenues(): Promise<VenuesResponse> {
  const res  = await fetch(`${BASE}/venues`, { headers: authHeaders() })
  const json = await res.json()
  if (!res.ok) throw new Error((json as any).message || "Failed to fetch venues")
  return json as VenuesResponse
}

// 7) Fetch a single venue
export async function getVenueById(id: string): Promise<{ data: Venue }> {
  const res = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}?_bookings=true`, {
    headers: authHeaders(),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || `Failed to fetch venue ${id}`);
  return json as { data: Venue };
}

// 8) Create a new venue
export async function createVenueApi(
  payload: NewVenueData
): Promise<CreateVenueResponse> {
  const res  = await fetch(`${BASE}/venues?_owner=true`, {
    method:  "POST",
    headers: authHeaders(),
    body:    JSON.stringify(payload),
  })
  const json = await res.json()
  if (!res.ok) {
    const apiErrors = Array.isArray((json as any).errors)
      ? (json as any).errors.map((e: any) => e.message).join("; ")
      : (json as any).message
    throw new Error(apiErrors || `Failed to create venue (${res.status})`)
  }
  return json as CreateVenueResponse
}

// 9) Fetch all venues by profile name (not email!)
export async function getVenuesByProfile(
  profileName: string
): Promise<VenuesResponse> {
  const res  = await fetch(
    `${BASE}/profiles/${encodeURIComponent(profileName)}/venues`,
    { headers: authHeaders() }
  )
  const json = await res.json()
  if (!res.ok) throw new Error((json as any).message || `Failed to fetch ${profileName}’s venues`)
  return json as VenuesResponse
}

export async function updateVenue(id: string, payload: NewVenueData): Promise<CreateVenueResponse> {
  const res = await fetch(`${BASE}/venues/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!res.ok) {
    const msg = (json as any).message || `Failed to update venue (${res.status})`;
    throw new Error(msg);
  }
  return json as CreateVenueResponse;
}

export async function deleteVenue(id:string): Promise<void> {
  const res = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "X-Noroff-API-Key": localStorage.getItem("apiKey") || ""
    },
  });

  if(!res.ok) {
    const json = await res.json();
    throw new Error(json?.message || `Failed to delete venue ${id}` );
  }
}