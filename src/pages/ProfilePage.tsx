import React from "react";
import { ProfileHeader } from "../components/Profile/ProfileHeader";
import { Panel } from "../components/Profile/Panel";
import { ListItem } from "../components/Profile/ListItem";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  // Mock data
  const avatarUrl = "https://placehold.co/200x200";
  const name = "John Doe";
  const bio =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.";

  const bookings = [
    { id: 1, image: "https://placehold.co/150x100", title: "Seaview Villa", dates: "12–16 May" },
    { id: 2, image: "https://placehold.co/150x100", title: "Mountain Cabin", dates: "20–22 Jun" },
  ];
  const venues = [
    { id: 1, image: "https://placehold.co/150x100", title: "Seaview Villa" },
    { id: 2, image: "https://placehold.co/150x100", title: "Mountain Cabin" },
  ];

  // Handlers (stubbed)
  const handleNewVenue = () => alert("Open create-venue form");
  const handleEditVenue = (id: number) => alert(`Edit venue ${id}`);
  const handleDeleteVenue = (id: number) =>
    window.confirm("Delete this venue?") && alert(`Deleted ${id}`);

  return (
    <div className="space-y-12">
      <ProfileHeader avatarUrl={avatarUrl} name={name} bio={bio} />

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
            <Link to="/venues/new"
            className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-black rounded-lg"
            >
              <FaPlus /> CreateNew Venue
            </Link>

          }
        >
          {venues.map((v) => (
            <ListItem
              key={v.id}
              image={v.image}
              title={v.title}
              subtitle=""
              actions={
                <>
                  <button
                    onClick={() => handleEditVenue(v.id)}
                    aria-label="Edit venue"
                  >
                    <FaEdit className="text-gray-600 hover:text-accent" />
                  </button>
                  <button
                    onClick={() => handleDeleteVenue(v.id)}
                    aria-label="Delete venue"
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
