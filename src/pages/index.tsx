import React, { useState, useEffect} from "react";
import type { Venue } from "../api/holidaze/venues";
import VenueCard from "../components/VenueCard";
import NavBar from "../components/nav";
import SearchBar from "../components/Home/SearchBar";
import SideBar from "../components/Home/SideBar";


const allowedUsers = ["Bulie.Habb", "BulieRegularU", "BulieVM", "NewTestUserJ"];

export default function HomePage() {

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");
  const apiKey = localStorage.getItem("apiKey");

  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");


useEffect(() => {
  async function fetchAllAllowedUserVenues() {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) headers.Authorization = `Bearer ${token}`;
      if (apiKey) headers["X-Noroff-API-Key"] = apiKey;

      const allVenues: Venue[] = [];

      for (const username of allowedUsers) {
        const res = await fetch(
          `https://v2.api.noroff.dev/holidaze/profiles/${username}/venues`,
          { headers }
        );
        const json = await res.json();
        if (res.ok && Array.isArray(json.data)) {
          allVenues.push(...json.data);
        } else {
          console.warn(`Skipping ${username}`, json.message);
        }
      }

      setVenues(allVenues);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  fetchAllAllowedUserVenues();
}, []);

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

  const searchFiltered = venues.filter((v) => 
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
                {searchFiltered.map((v) => (
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

