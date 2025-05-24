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

export async function getBookingsByVenue(id: string): Promise<Booking[]> {
  
  const token = localStorage.getItem("token");
  const apiKey = localStorage.getItem("apiKey");

  if (!token || !apiKey) {
    throw new Error("Missing authentication information");
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    "X-Noroff-API-Key": apiKey,
    "Content-Type": "application/json",
  };

  const response = await fetch(`https://v2.api.noroff.dev/holidaze/bookings/${id}`, {
  headers,
});


  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch bookings");
  }

  return data.data as Booking[];
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