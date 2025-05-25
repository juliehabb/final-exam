/**
 * @file Handles all API operations related to venues on the Holidaze platform.
 */
import type { Booking } from "./bookings"

/**
 * A simplified Venue type used across the app.
 */
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


const BASE = "https://v2.api.noroff.dev/holidaze"

/**
 * Fetches all venues from the API.
 */
function authHeaders(): Record<string,string> {
  const h: Record<string,string> = { "Content-Type": "application/json" }
  const token = localStorage.getItem("token")
  const key   = localStorage.getItem("apiKey")
  if (token) h.Authorization      = `Bearer ${token}`
  if (key)   h["X-Noroff-API-Key"] = key
  return h
}

/**
 * Fetches a single venue by ID, including bookings.
 * 
 * @param id The venue ID to fetch.
 */
export async function getAllVenues(): Promise<VenuesResponse> {
  const res  = await fetch(`${BASE}/venues`, { headers: authHeaders() })
  const json = await res.json()
  if (!res.ok) throw new Error((json as any).message || "Failed to fetch venues")
  return json as VenuesResponse
}

/**
 * Fetches a single venue by ID, including bookings.
 * 
 * @param id The venue ID to fetch.
 */
export async function getVenueById(id: string): Promise<{ data: Venue }> {
  const res = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}?_bookings=true`, {
    headers: authHeaders(),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || `Failed to fetch venue ${id}`);
  return json as { data: Venue };
}

/**
 * Creates a new venue.
 * 
 * @param payload The data for the new venue.
 */
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

/**
 * Fetches all venues owned by a given profile.
 * 
 * @param profileName The profile name (username).
 */
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

/**
 * Updates an existing venue.
 * 
 * @param id The venue ID.
 * @param payload The updated venue data.
 */
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

/**
 * Deletes a venue by ID.
 * 
 * @param id The venue ID to delete.
 */
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