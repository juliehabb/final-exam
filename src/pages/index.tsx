import React, { useState} from "react";
import { useVenues } from "../hooks/useVenues";
import VenueCard from "../components/VenueCard";
import NavBar from "../components/nav";
import SearchBar from "../components/Home/SearchBar";
import SideBar from "../components/Home/SideBar";

export default function HomePage() {
  const { venues, loading, error } = useVenues();
  const [searchTerm, setSearchTerm] = useState("");

  
  function amenitiesFrom(meta: Record<string, boolean>) {
    return Object.entries(meta)
      .filter(([_, v]) => v)
      .map(([k]) =>
        k === "wifi" ? "Wifi"
      : k === "parking"   ? "Parking"
      : k === "breakfast" ? "Breakfast"
      : k === "pets"      ? "Pets"
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
            {loading && <p>Loading venues…</p>}
            {error   && <p className="text-red-500">Error: {error}</p>}

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

