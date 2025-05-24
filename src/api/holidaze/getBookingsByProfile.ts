import { Booking } from "./bookings";


const BASE = "https://v2.api.noroff.dev/holidaze";

export async function getBookingsByProfile(profileName: string): Promise<Booking[]> {
  const token = localStorage.getItem("token");
  const apiKey = localStorage.getItem("apiKey");

  const headers = {
    Authorization: `Bearer ${token}`,
    "X-Noroff-API-Key": apiKey || "",
    "Content-Type": "application/json",
  };

  const res = await fetch(`${BASE}/profiles/${profileName}/bookings?_venue=true`, {
    headers,
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to fetch user bookings");

  return json.data as Booking[];
}