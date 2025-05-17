import React, { useState, useEffect} from "react";
import { getVenuesByProfile } from "../api/holidaze/venues";
import type { Venue } from "../api/holidaze/venues";
import VenueCard from "../components/VenueCard";
import NavBar from "../components/nav";
import SearchBar from "../components/Home/SearchBar";
import SideBar from "../components/Home/SideBar";

export default function HomePage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;
  const profileName = user?.name;

  useEffect(() => {
    async function fetchUserVenues() {
      if (!profileName) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }

      try {
        const res = await getVenuesByProfile(profileName);
        setVenues(res.data);
      } catch (err: any) {
        setError(err.message || "Could not fetch user venues");
      } finally {
        setLoading(false);
      }
    }

    fetchUserVenues();
  }, [profileName]);

  function amenitiesFrom(meta: Record<string, boolean>) {
    return Object.entries(meta)
      .filter(([_, v]) => v)
      .map(([k]) =>
        k === "wifi"
          ? "Wifi"
          : k === "parking"
          ? "Parking"
          : k === "breakfast"
          ? "Breakfast"
          : k === "pets"
          ? "Pets"
          : k
      );
  }

  const filteredVenues = venues.filter((v) =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <NavBar />
      <main className="p-4">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        <section className="flex gap-4">
          <SideBar />

          <div className="flex-1">
            {loading && <p>Loading your venues…</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && (
              <div className="flex flex-wrap gap-8 justify-center py-8">
                {filteredVenues.map((v) => (
                  <VenueCard
                    key={v.id}
                    id={v.id}
                    image={v.media[0]?.url || ""}
                    title={v.name}
                    location={`${v.location.city}, ${v.location.country}`}
                    rating={v.rating}
                    price={v.price}
                    amenities={amenitiesFrom(v.meta)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

