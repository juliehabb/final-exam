import { useState, useEffect } from "react"
import {
  getVenuesByProfile,
  Venue,
  VenuesResponse,
} from "../api/holidaze/venues"

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
