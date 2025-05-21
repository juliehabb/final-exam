// Shared type for all booking usage
export type Booking = {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue: {
    id: string;
    name: string;
    media: { url: string; alt?: string }[];
  };
};

export type CreateBookingData = {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
};

export type BookingResponse = {
  data: Booking;
  meta: Record<string, unknown>;
};

const BASE_URL = "https://v2.api.noroff.dev";

export async function createBooking(
  payload: CreateBookingData,
  token: string
): Promise<BookingResponse> {
  const apiKey = localStorage.getItem("apiKey");
  const authToken = token || localStorage.getItem("token");

  console.log("Using token for booking:", authToken);
  console.log("Using API key for booking:", apiKey);

  if (!authToken || !apiKey) {
    throw new Error("Missing token or API key");
  }

  const res = await fetch(`${BASE_URL}/holidaze/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok) {
    const msg = (json as any).message || `Booking failed (${res.status})`;
    throw new Error(msg);
  }

  return json as BookingResponse;
}

/**
 * Fetch bookings for a specific venue (for venue managers to see when it's booked)
 */
// Get all bookings, then filter by venueId
export async function getBookingsByVenue(venueId: string): Promise<Booking[]> {
  const apiKey = localStorage.getItem("apiKey");
  const token = localStorage.getItem("token");

  if (!token || !apiKey) {
    throw new Error("Missing auth token or API key");
  }

  const res = await fetch("https://v2.api.noroff.dev/holidaze/bookings?_venue=true", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error((json as any).message || "Failed to fetch bookings");
  }

  const allBookings: Booking[] = json.data;
  return allBookings.filter((b) => b.venue.id === venueId);
}

export async function deleteBooking (id: string): Promise<void> {
  const token = localStorage.getItem("token");
  const apiKey = localStorage.getItem("apiKey");

  if (!token || !apiKey ) throw new Error("Missing auth credentials");

  const res = await fetch(`https://v2.api.noroff.dev/holidaze/bookings/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,

    },
  });

  if (!res.ok) {
    const json = await res.json();
    throw new Error(json.message || `Failed to delete booking (${res.status})` )
  }
}