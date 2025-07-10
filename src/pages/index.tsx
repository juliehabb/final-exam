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
 * Manually assign fake types to some venues for demo filtering.
 */
function assignFakeType(v: Venue): Venue & { fakeType: string } {
  const index = v.name.length % 3;
  const fakeType = index === 0 ? "hotel" : index === 1 ? "apartment" : "home";
  return { ...v, fakeType };
}

/**
 * HomePage displays a list of venues either fetched from public or filtered by user access.
 * Users can search for venues, and results are filtered by name.
 */
export default function HomePage() {
  const [venues, setVenues] = useState<(Venue & { fakeType: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<"hotel" | "apartment" | "home" | "">("");
  const [currentPage, setCurrentPage] = useState(1);
  const venuesPerPage = 8;

  useEffect(() => {
    async function fetchVenues() {
      const token = localStorage.getItem("token");
      const apiKey = localStorage.getItem("apiKey");

      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers.Authorization = `Bearer ${token}`;
      if (apiKey) headers["X-Noroff-API-Key"] = apiKey;

      try {
        const allVenues: Venue[] = [];

        if (token && apiKey) {
          for (const username of allowedUsers) {
            const res = await fetch(
              `https://v2.api.noroff.dev/holidaze/profiles/${username}/venues`,
              { headers }
            );
            const json = await res.json();
            if (res.ok && Array.isArray(json.data)) {
              allVenues.push(...json.data);
            }
          }
        } else {
          const res = await fetch("https://v2.api.noroff.dev/holidaze/venues");
          const json = await res.json();
          if (res.ok && Array.isArray(json.data)) {
            allVenues.push(...json.data);
          }
        }

        setVenues(allVenues.map(assignFakeType));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setLoading(false);
      }
    }

    fetchVenues();
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

  const filtered = venues.filter((v) => {
    const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType ? v.fakeType === selectedType : true;
    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(filtered.length / venuesPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * venuesPerPage,
    currentPage * venuesPerPage
  );

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }

  return (
    <main className="p-4">
      <div className="max-w-full mb-6">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      <section className="flex gap-4">
        <div className="pt-10">
          <SideBar onSelectType={setSelectedType} />
        </div>

        <div className="flex-1">
          {loading && <p>Loading your venues…</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-8">
                {paginated.length > 0 ? (
                  paginated.map((v) => (
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

              {/* Pagination controls */}
              <div className="flex justify-center gap-4 mt-6">
                <button
                  className="px-4 py-2 bg-gray-200 rounded"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ← Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-100"
                    }`}
                    onClick={() => goToPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="px-4 py-2 bg-gray-200 rounded"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next →
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}