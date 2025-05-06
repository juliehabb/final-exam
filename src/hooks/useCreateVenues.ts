
import { useState, useEffect } from "react";
import {
  NewVenueData,
  createVenueApi,
  CreateVenueResponse,
} from "../api/holidaze/venues";



export function useCreateVenue() {
    const [loading, setLoading] = useState(false);
    const [error,   setError]   = useState<string | null>(null);
  
    async function createVenue(data: NewVenueData): Promise<CreateVenueResponse> {
      setLoading(true);
      setError(null);
      try {
        const response = await createVenueApi(data);
        return response;
      } catch (err: any) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    }
  
    return { createVenue, loading, error };
  }