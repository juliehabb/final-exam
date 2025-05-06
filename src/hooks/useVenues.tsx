import { useState, useEffect } from "react";
import { getAllVenues, Venue, VenuesResponse } from "../api/holidaze/venues";

export function useVenues() {
    const [venues, setVenues] = useState<Venue[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      setLoading(true);
      getAllVenues()
        .then((res: VenuesResponse) => setVenues(res.data))
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }, []);
  
    return { venues, loading, error};
}