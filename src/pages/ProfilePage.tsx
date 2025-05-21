import React, { useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"
import { ProfileHeader } from "../components/Profile/ProfileHeader"
import { Panel }         from "../components/Profile/Panel"
import { ListItem }      from "../components/Profile/ListItem"
import { useUserVenues } from "../hooks/useUsersVenues"
import { useUserProfile } from "../hooks/useUserProfile"
import { VenueBookingModal } from "../components/Profile/venueBookingModal"
import { getBookingsByVenue, deleteBooking } from "../api/holidaze/bookings"
import { updateProfile } from "../api/holidaze/profiles"
import type { Venue }    from "../api/holidaze/venues"
import { deleteVenue } from "../api/holidaze/venues"
import type { Booking } from "../api/holidaze/bookings"



export default function ProfilePage() {
  const navigate = useNavigate();
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;
  const name = user?.name as string;

  const { profile, loading: profileLoading, error: profileError } = useUserProfile(name);
  const { venues: myVenues, loading: venueLoading, error: venueError } = useUserVenues(name);
  const bookings: Booking[] = profile?.bookings || [];

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

  const [showEdit, setShowEdit] = useState(false);
  const [bio, setBio] = useState(user?.bio || "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar?.url || "");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [cancelBookingId, setCancelBookingId] = useState<string | null>(null);

  async function handleProfileUpdate(e: React.FormEvent) {
    e.preventDefault();
    try {
      await updateProfile(name, { bio, avatar: { url: avatarUrl } });
      alert("Profile updated!");

      const updatedUser = { ...user, bio, avatar: { url: avatarUrl } };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      window.location.reload();
    } catch (err: any) {
      alert("Update failed: " + err.message);
    }
  }

  return (
    <div className="space-y-12">
      <ProfileHeader avatarUrl={user?.avatar?.url || ""} name={user?.name || ""} bio={user?.bio || ""} />

      {/* Edit Profile Button */}
      <div className="flex justify-end px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => setShowEdit(true)}
          className="px-4 py-2 bg-blue-400 text-black rounded hover:bg-accent-dark"
        >
          Edit Profile
        </button>
      </div>

      {/* Edit Profile Modal */}
      {showEdit && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              onClick={() => setShowEdit(false)}
              aria-label="Close"
            >
              ×
            </button>

            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  className="w-full border p-2 rounded"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Avatar URL</label>
                <input
                  type="url"
                  className="w-full border p-2 rounded"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowEdit(false)} className="px-4 py-2 border rounded">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8 px-4 sm:px-6 lg:px-8">
        {/* Bookings Panel */}
        <Panel title="Your bookings">
          {profileLoading && <p>Loading bookings…</p>}
          {profileError && <p className="text-red-500">Error: {profileError}</p>}

          {!profileLoading && bookings.length === 0 && <p className="text-gray-500">You haven’t booked any stays yet.</p>}

          {!profileLoading &&
            bookings.map((b) => (
              <ListItem
                key={b.id}
                image={b.venue?.media?.[0]?.url || ""}
                title={b.venue?.name || "Unknown venue"}
                subtitle={`${new Date(b.dateFrom).toLocaleDateString()} – ${new Date(b.dateTo).toLocaleDateString()}`}
                actions={
                  <>
                    <button
                      onClick={() => alert("Edit functionality not implemented")}
                      className="text-blue-600 hover:underline text-sm mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setCancelBookingId(b.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Cancel
                    </button>
                  </>
                }
              />
            ))}
        </Panel>

        {/* Venues Panel */}
        <Panel
          title="Your venues"
          actions={
            <Link to="/venues/new" className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg">
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
                title={v.name}
                subtitle=""
                actions={
                  <>
                    <button onClick={() => openBookingModal(v)} className="text-sm text-indigo-600 hover:underline">
                      View Bookings
                    </button>
                    <Link to={`/venues/${v.id}/edit`} aria-label="Edit">
                      <FaEdit className="text-gray-600 hover:text-accent" />
                    </Link>
                    <button
                      onClick={() => setConfirmDeleteId(v.id)}
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

      {/* Booking Modal */}
      {modalVenueId && (
        <VenueBookingModal
          venueName={modalVenueName}
          bookings={modalBookings}
          onClose={() => setModalVenueId(null)}
        />
      )}

      {/* Delete Venue Confirmation */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full relative shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Delete Venue</h2>
            <p className="mb-6 text-gray-700">
              Are you sure you want to delete this venue? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button onClick={() => setConfirmDeleteId(null)} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    await deleteVenue(confirmDeleteId);
                    setConfirmDeleteId(null);
                    window.location.reload();
                  } catch (err: any) {
                    alert("Failed to delete venue: " + err.message);
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Booking Confirmation */}
      {cancelBookingId && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full relative shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Cancel Booking</h2>
            <p className="mb-6 text-gray-700">
              Are you sure you want to cancel this booking?
            </p>
            <div className="flex justify-end gap-4">
              <button onClick={() => setCancelBookingId(null)} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    await deleteBooking(cancelBookingId);
                    setCancelBookingId(null);
                    window.location.reload();
                  } catch (err: any) {
                    alert("Failed to cancel booking: " + err.message);
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}