import { useState, useEffect } from "react";
import { getAllVenues, Venue } from "../api/holidaze/venues";

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