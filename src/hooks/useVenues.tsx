import { useState, useEffect } from "react";
import { getAllVenues, Venue} from "../api/holidaze/venues";

/**
 * Custom hook to fetch all venues from the Holidaze API.
 *
 * @returns An object with:
 * - venues: Array of Venue objects.
 * - loading: Boolean indicating if data is still loading.
 * - error: String if an error occurred, otherwise null.
 */
export function useVenues() {
    const [venues, setVenues] = useState<Venue[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        getAllVenues()
          .then((res) => {
            if (!cancelled) {
                setVenues(res.data);
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
    }, []);

    return { venues, loading, error};
}