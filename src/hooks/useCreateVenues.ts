
import { useState } from "react";
import {
  createVenueApi,
  NewVenueData,
  CreateVenueResponse,
} from "../api/holidaze/venues";


export function useCreateVenue() {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  async function createVenue(data: NewVenueData): Promise<CreateVenueResponse> {
    setLoading(true);
    setError(null);
    try {
      return await createVenueApi(data);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { createVenue, loading, error };
}