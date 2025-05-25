import { useState, useEffect } from "react"
import {
  getVenuesByProfile,
  Venue,
  VenuesResponse,
} from "../api/holidaze/venues"

/**
 * A React hook to fetch venues created by a specific user profile.
 *
 * @param {string} profileName - The profile name (not email) of the user
 * @returns An object containing:
 *   - venues: List of venues created by the user
 *   - loading: True while loading
 *   - error: Any error message or null
 */
export function useUserVenues(profileName?: string) {
  const [venues, setVenues]     = useState<Venue[]>([])
  const [loading, setLoading]   = useState<boolean>(false)
  const [error, setError]       = useState<string | null>(null)

  useEffect(() => {
    if (!profileName) return
    setLoading(true)
    getVenuesByProfile(profileName)
      .then((res: VenuesResponse) => setVenues(res.data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [profileName])

  return { venues, loading, error }
}
