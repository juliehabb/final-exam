import React, { useEffect } from "react";
import { ProfileHeader } from "../components/Profile/ProfileHeader";
import { Panel } from "../components/Profile/Panel";
import { ListItem } from "../components/Profile/ListItem";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { Venue } from "../api/holidaze/venues";
import { useUserVenues } from "../hooks/useUsersVenues";

export default function ProfilePage() {
  // 1) get the logged-in user from localStorage
  const userJson  = localStorage.getItem("user");
  const user      = userJson ? JSON.parse(userJson) : null;
  const email = user?.email as string;

  // 2) fetch only this user’s venues
  const { venues: myVenues, loading, error } = useUserVenues(email);

  useEffect(() => {
    console.log( "Current user object", user);
    console.log("All fetched venues (filtered(", myVenues);
    myVenues.forEach((v: Venue) => {
      console.log(` Venue ${v.id} owner =`, v.owner);
    });
  }, [user, myVenues]);
  
    // 3) mock bookings (or fetch the same way if you implement bookings API)
    const bookings = [
      { id: 1, image: "...", title: "Seaview Villa", dates: "12–16 May" },
      { id: 2, image: "...", title: "Mountain Cabin", dates: "20–22 Jun" },
    ];


    return (
      <div className="space-y-12">
        <ProfileHeader
          avatarUrl={user?.avatar?.url || ""}
          name={user?.name || ""}
          bio={user?.bio || ""}
        />
  
        <div className="flex flex-col lg:flex-row gap-8 px-4 sm:px-6 lg:px-8">
          {/* Your bookings */}
          <Panel title="Your bookings">
            {bookings.map((b) => (
              <ListItem
                key={b.id}
                image={b.image}
                title={b.title}
                subtitle={b.dates}
              />
            ))}
          </Panel>
  
          {/* Your venues */}
          <Panel
            title="Your venues"
            actions={
              <Link
                to="/venues/new"
                className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-black rounded-lg"
              >
                <FaPlus /> New Venue
              </Link>
            }
          >
            {loading && <p>Loading venues…</p>}
            {error   && <p className="text-red-500">Error: {error}</p>}
  
            {!loading && !error && myVenues.length === 0 && (
              <p className="text-gray-500">You haven’t created any venues yet.</p>
            )}
  
            {!loading && !error && myVenues.map((v: Venue) => (
              <ListItem
                key={v.id}
                image={v.media[0]?.url || ""}
                title={v.name}
                subtitle=""
                actions={
                  <>
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
      </div>
    );
}