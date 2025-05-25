import { useEffect, useState } from "react";
import type { Booking } from "../api/holidaze/bookings";
import type { Venue } from "../api/holidaze/venues";

/**
 * Structure of a user's profile from the Noroff Holidaze API.
 */
type UserProfile = {
    name: string;
    email: string;
    bio?: string;
    avatar?: { url: string; alt?: string };
    bookings: Booking[];
    venues: Venue[];
  };

  /**
 * A React hook that fetches a user's profile including their bookings and venues.
 *
 * @param {string} username - The username to fetch data for
 * @returns An object containing:
 *   - profile: The user's full profile data or null
 *   - loading: True while loading
 *   - error: Any error message or null
 */
  export function useUserProfile(username: string) {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      async function fetchProfile() {
        try {
          const res = await fetch(
            `https://v2.api.noroff.dev/holidaze/profiles/${username}?_bookings=true&_venues=true`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "X-Noroff-API-Key": localStorage.getItem("apiKey") || "",
              },
            }
          );
          const json = await res.json();
          if (!res.ok) throw new Error(json.message || "Could not load profile");
          setProfile(json.data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
  
      fetchProfile();
    }, [username]);
  
    return { profile, loading, error };
  }