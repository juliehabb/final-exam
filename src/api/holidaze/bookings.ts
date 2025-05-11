export type CreateBookingData = {
    dateFrom: string;
    dateTo: string;
    guests: number;
    venueId: string;
  };
  
  export type BookingResponse = {
    data: {
      id: string;
      dateFrom: string;
      dateTo: string;
      guests: number;
      created: string;
      updated: string;
    };
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
  