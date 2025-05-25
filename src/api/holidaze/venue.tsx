
/**
 * Represents detailed information about a single venue.
 */
export type VenueDetail = {
    id: string;
    name: string;
    description: string;
    media: { url: string; alt: string }[];
    price: number;
    maxGuests: number;
    rating: number;
    meta: { wifi: boolean; parking: boolean; breakfast: boolean; pets: boolean };
    location: { address: string; city: string; zip: string; country: string };
  };
  
  /**
 * Structure of the API response when fetching a single venue's details.
 */
  export type VenueDetailResponse = {
    data: VenueDetail;
    meta: Record<string, unknown>;
  };
  
  const BASE_URL = "https://v2.api.noroff.dev";
  
  /**
 * Fetches detailed information for a single venue by its ID.
 *
 * This function sends a GET request to the Noroff API and retrieves all
 * details for a venue, including media, location, and amenities.
 *
 * @param {string} id - The unique ID of the venue to fetch.
 * @returns {Promise<VenueDetailResponse>} A promise that resolves with venue details.
 * @throws {Error} If the fetch fails or the venue cannot be found.
 */
  export async function getVenue(id: string): Promise<VenueDetailResponse> {
    const res = await fetch(`${BASE_URL}/holidaze/venues/${id}`);
    const json = await res.json();
    if (!res.ok) {
      throw new Error((json as any).message || `Failed to load venue ${id}`);
    }
    return json as VenueDetailResponse;
  }