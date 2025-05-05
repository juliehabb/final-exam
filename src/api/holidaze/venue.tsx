
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
  
  export type VenueDetailResponse = {
    data: VenueDetail;
    meta: Record<string, unknown>;
  };
  
  const BASE_URL = "https://v2.api.noroff.dev";
  
  export async function getVenue(id: string): Promise<VenueDetailResponse> {
    const res = await fetch(`${BASE_URL}/holidaze/venues/${id}`);
    const json = await res.json();
    if (!res.ok) {
      throw new Error((json as any).message || `Failed to load venue ${id}`);
    }
    return json as VenueDetailResponse;
  }