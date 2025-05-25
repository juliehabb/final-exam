
import { useState} from "react";
import {
  NewVenueData,
  createVenueApi,
  CreateVenueResponse,
} from "../api/holidaze/venues";

/**
 * A custom hook to handle creating a new venue.
 *
 * @returns {Object} An object containing:
 * - createVenue: function to create a new venue
 * - loading: boolean indicating if the request is in progress
 * - error: error message if the request fails
 */
export function useCreateVenue() {
    const [loading, setLoading] = useState(false);
    const [error,   setError]   = useState<string | null>(null);
  
    /**
   * Calls the API to create a new venue.
   *
   * @param {NewVenueData} data - The venue information to be submitted
   * @returns {Promise<CreateVenueResponse>} Response from the API
   * @throws Will throw an error if the API call fails
   */
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