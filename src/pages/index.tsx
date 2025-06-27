import React, { useState, useEffect} from "react";
import type { Venue } from "../api/holidaze/venues";
import VenueCard from "../components/VenueCard";
import SearchBar from "../components/Home/SearchBar";
import SideBar from "../components/Home/SideBar";

/**
 * Usernames that are allowed to display venues when logged in.
 */
const allowedUsers = [
  "BulieVM2",
  "BulieRegularU",
  "BulieVM",
  "NewTestUserJ"
];

/**
 * Generates a consistent mock rating from the venue ID
 */
function mockRating(id: string) {
  const seed = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return parseFloat((3 + (seed % 20) * 0.1).toFixed(1)); // 3.0 - 5.0 range
}

/**
 * HomePage displays a list of venues either fetched from public or filtered by user access.
 * Users can search for venues, and results are filtered by name.
 */
export default function HomePage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Fetches venues based on user login state and allowed user filter.
   */
useEffect(() => {
  async function fetchVenues() {
    const token = localStorage.getItem("token");
    const apiKey = localStorage.getItem("apiKey");

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) headers.Authorization = `Bearer ${token}`;
    if (apiKey) headers["X-Noroff-API-Key"] = apiKey;

    try {
      const allVenues: Venue[] = [];

      if (token && apiKey) {
        // Logged in – filter by allowed users
        for (const username of allowedUsers) {
          const res = await fetch(
            `https://v2.api.noroff.dev/holidaze/profiles/${username}/venues`,
            { headers }
          );
          const json = await res.json();

          if (res.ok && Array.isArray(json.data)) {
            allVenues.push(...json.data);
          } else {
            console.warn(` Skipping ${username}`, json.message);
          }
        }
      } else {
        // Not logged in – show all public venues (no filtering)
        const res = await fetch("https://v2.api.noroff.dev/holidaze/venues");
        const json = await res.json();

        if (res.ok && Array.isArray(json.data)) {
          allVenues.push(...json.data);
        } else {
          console.warn(" Public fetch failed", json.message);
        }
      }

      setVenues(allVenues);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  fetchVenues();
}, []);


  /**
   * Transforms meta properties into human-readable amenity names.
   */
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
  
  /**
   * Filters venues based on the user's search input.
   */
  const searchFiltered = venues.filter((v) =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <main className="p-4">
  {/* Top search bar across full width */}
  <div className="max-w-full mb-6">
    <SearchBar value={searchTerm} onChange={setSearchTerm} />
  </div>

  {/* Layout: Sidebar + Grid */}
  <section className="flex gap-4">
    {/* Sidebar aligned with grid */}
    <div className="pt-10">
      <SideBar />
    </div>

    <div className="flex-1">
      {loading && <p>Loading your venues…</p>}
      {error && <p className="text-red-500">{error}</p>}

      

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-8">
          {searchFiltered.length > 0 ? (
            searchFiltered.map((v) => (
              <VenueCard
                key={v.id}
                id={v.id}
                image={v.media[0]?.url || ""}
                title={v.name}
                location={`${v.location.city}, ${v.location.country}`}
                rating={v.rating > 0 ? v.rating : mockRating(v.id)}
                price={v.price}
                amenities={amenitiesFrom(v.meta)}
              />
            ))
          ) : (
            <p>No venues found.</p>
          )}
        </div>
      )}
    </div>
  </section>
      </main>

    </>
  );
}