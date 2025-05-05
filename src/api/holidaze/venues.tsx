//1) Shape of a single venue (Only pull the fields that is actually rendered)
export type Venue = {
    id: string;
    name: string;
    price: number;
    rating: number;
    media: {
      url: string;
      alt: string;
    }[];
    location: {
      city: string;
      country: string;
    };
    meta: {
      wifi: boolean;
      parking: boolean;
      breakfast: boolean;
      pets: boolean;
    };
  };
  
  // 2) Response from GET /holidaze/venues
  export type VenuesResponse = {
    data: Venue[];
    meta: Record<string, unknown>;
  };
  
  const BASE_URL = "https://v2.api.noroff.dev";
  
  // 3) Fetch all venues
  export async function getAllVenues(): Promise<VenuesResponse> {
    const res = await fetch(`${BASE_URL}/holidaze/venues`);
    const json = await res.json();
    if (!res.ok) {
      const msg = (json as any).message || `Failed to fetch venues (${res.status})`;
      throw new Error(msg);
    }
    return json as VenuesResponse;
  }