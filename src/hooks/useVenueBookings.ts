import { useEffect, useState } from "react";

/**
 * Represents a single booking entry.
 */
export type Booking = {
  id: string;
  dateFrom: string;
  dateTo: string;
};

/**
 * React hook to fetch bookings for a specific venue.
 *
 * @param {string} venueId - The ID of the venue whose bookings you want to retrieve.
 * @returns An object with:
 *   - bookings: Array of bookings.
 *   - loading: Boolean, true while fetching.
 *   - error: Error message if the request fails.
 */
export function useVenueBookings(venueId: string) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const token = localStorage.getItem("token");
        const apiKey = localStorage.getItem("apiKey");
        const res = await fetch(
          `https://v2.api.noroff.dev/holidaze/venues/${venueId}/bookings`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Noroff-API-Key": apiKey || "",
            },
          }
        );
        const json = await res.json();
        if (!res.ok) throw new Error(json.message || "Failed to fetch");
        setBookings(json.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, [venueId]);

  return { bookings, loading, error };
}