import { useMemo } from "react";
import { useVenues } from "./useVenues";
import type { Venue } from "../api/holidaze/venues";

/**
 * Returns only the venues whose `owner.email` matches the given email.
 */
export function useUserVenues(email?: string) {
  const { venues, loading, error} = useVenues();

  const userVenues = useMemo(
    () =>
      email
      ? venues.filter((v: Venue) => v.owner?.email === email)
      : [],
    [venues, email]
  );

  return { venues: userVenues, loading, error};
}