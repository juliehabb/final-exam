import { useState, useEffect } from "react";
import { getVenue, VenueDetail } from "../api/holidaze/venue";

/**
 * A React hook that fetches detailed information for a single venue.
 *
 * @param {string} id - The unique ID of the venue.
 * @returns An object containing:
 *   - venue: The detailed venue data (or null while loading).
 *   - loading: True while the request is in progress.
 *   - error: Any error message that occurred, or null.
 */
export function useVenue(id: string) {
  const [venue, setVenue]     = useState<VenueDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getVenue(id)
      .then((res) => {
        if (!cancelled) {
          setVenue(res.data);
          setLoading(false);
        }
      })
      .catch((err: any) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [id]);

  return { venue, loading, error };
}
