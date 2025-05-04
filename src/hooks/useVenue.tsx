import { useState, useEffect } from "react";
import { getVenue, VenueDetail } from "../api/holidaze/venue";

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
