
import type { Booking } from "./bookings";
import type { Venue } from "./venues";
import { getBookingsByVenue } from "./bookings";
import { getVenuesByProfile } from "./venues";

/**
 * Fetches all bookings made on the venues managed by the currently logged-in user.
 */
export async function getBookingsForUserVenues(): Promise<Booking[]> {
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;

  if (!user?.name) {
    throw new Error("User not found in localStorage");
  }

  const venueRes = await getVenuesByProfile(user.name);
  const venues: Venue[] = venueRes.data;

  const bookings: Booking[] = [];

  for (const venue of venues) {
    try {
      const venueBookings = await getBookingsByVenue(venue.id);
      bookings.push(...venueBookings);
    } catch (err) {
      console.warn(`Failed to fetch bookings for venue ${venue.id}:`, (err as Error).message);
    }
  }

  return bookings;
}
