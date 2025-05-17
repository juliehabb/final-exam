import React, {useState} from "react"
import { Link } from "react-router-dom"
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"
import { ProfileHeader } from "../components/Profile/ProfileHeader"
import { Panel }         from "../components/Profile/Panel"
import { ListItem }      from "../components/Profile/ListItem"
import { useUserVenues } from "../hooks/useUsersVenues"
import { useUserProfile } from "../hooks/useUserProfile"
import { VenueBookingModal } from "../components/Profile/venueBookingModal"
import { getBookingsByVenue } from "../api/holidaze/bookings"
import type { Venue }    from "../api/holidaze/venues"
import type { Booking } from "../api/holidaze/bookings"


export default function ProfilePage() {
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;
  const name = user?.name as string;

  const { profile, loading: profileLoading, error: profileError } = useUserProfile(name);
  const { venues: myVenues, loading: venueLoading, error: venueError } = useUserVenues(name);

  const bookings: Booking[] = profile?.bookings || [];

  //  Modal state
  const [modalVenueId, setModalVenueId] = useState<string | null>(null);
  const [modalVenueName, setModalVenueName] = useState<string>("");
  const [modalBookings, setModalBookings] = useState<Booking[]>([]);

  async function openBookingModal(venue: Venue) {
    try {
      const bookings = await getBookingsByVenue(venue.id);
      setModalVenueName(venue.name);
      setModalBookings(bookings);
      setModalVenueId(venue.id);
    } catch (err: any) {
      console.error("Failed to fetch bookings for venue:", err.message);
    }
  }

  return (
    <div className="space-y-12">
      <ProfileHeader
        avatarUrl={user?.avatar?.url || ""}
        name={user?.name || ""}
        bio={user?.bio || ""}
      />

      <div className="flex flex-col lg:flex-row gap-8 px-4 sm:px-6 lg:px-8">
        {/* Bookings */}
        <Panel title="Your bookings">
          {profileLoading && <p>Loading bookings…</p>}
          {profileError && <p className="text-red-500">Error: {profileError}</p>}

          {!profileLoading && bookings.length === 0 && (
            <p className="text-gray-500">You haven’t booked any stays yet.</p>
          )}

          {!profileLoading &&
            bookings.map((b: Booking) => (
              <ListItem
                key={b.id}
                image={b.venue?.media?.[0]?.url || ""}
                title={b.venue?.name || "Unknown venue"}
                subtitle={`${new Date(b.dateFrom).toLocaleDateString()} – ${new Date(
                  b.dateTo
                ).toLocaleDateString()}`}
              />
            ))}
        </Panel>

        {/* Venues */}
        <Panel
          title="Your venues"
          actions={
            <Link
              to="/venues/new"
              className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg"
            >
              <FaPlus /> New Venue
            </Link>
          }
        >
          {venueLoading && <p>Loading venues…</p>}
          {venueError && <p className="text-red-500">Error: {venueError}</p>}

          {!venueLoading && !venueError && myVenues.length === 0 && (
            <p className="text-gray-500">You haven’t created any venues yet.</p>
          )}

          {!venueLoading &&
            !venueError &&
            myVenues.map((v: Venue) => (
              <ListItem
                key={v.id}
                image={v.media[0]?.url || ""}
                title={`${v.name}`}
                subtitle=""
                actions={
                  <>
                    <button onClick={() => openBookingModal(v)} className="text-sm text-indigo-600 hover:underline">
                      View Bookings
                    </button>
                    <button onClick={() => alert(`Edit ${v.id}`)} aria-label="Edit">
                      <FaEdit className="text-gray-600 hover:text-accent" />
                    </button>
                    <button
                      onClick={() =>
                        window.confirm("Delete this venue?") && alert(`Deleted ${v.id}`)
                      }
                      aria-label="Delete"
                    >
                      <FaTrash className="text-gray-600 hover:text-red-500" />
                    </button>
                  </>
                }
              />
            ))}
        </Panel>
      </div>

      {/*  Modal */}
      {modalVenueId && (
        <VenueBookingModal
          venueName={modalVenueName}
          bookings={modalBookings}
          onClose={() => setModalVenueId(null)}
        />
      )}
    </div>
  );
}