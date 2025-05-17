import React, { useEffect, useState, FormEvent} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVenueById, updateVenue } from "../api/holidaze/venues";
import type { NewVenueData, Venue } from "../api/holidaze/venues";

export default function EditVenuePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVenue() {
      try {
        const res = await getVenueById(id!);
        setVenue(res.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchVenue();
  }, [id]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!venue) return;

    const payload: NewVenueData = {
      name: venue.name,
      description: venue.description,
      media: venue.media,
      price: venue.price,
      maxGuests: venue.maxGuests,
      rating: 0,
      meta: venue.meta,
      location: venue.location,
    };

    try {
      await updateVenue(id!, payload);
      alert("Venue updated!");
      navigate("/profile");
    } catch (err: any) {
      setError(err.message);
    }
  }

  if (loading) return <p className="p-4">Loading venue…</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;
  if (!venue) return null;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg space-y-4">
      <h1 className="text-2xl font-bold">Edit Venue</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
        className="w-full px-4 py-2 border rounded"
        value={venue.name}
        onChange={(e) => setVenue({ ...venue, name: e.target.value})}
        placeholder="Venue name"
        required
         />
        
        <textarea
          className="w-full px-4 py-2 border rounded h-24"
          value={venue.description}
          onChange={(e) => setVenue({ ...venue, description: e.target.value })}
          placeholder="Description"
          required
        />
        <input
          className="w-full px-4 py-2 border rounded"
          value={venue.media[0]?.url || ""}
          onChange={(e) =>
            setVenue({
              ...venue,
              media: [{ url: e.target.value, alt: venue.media[0]?.alt || "" }],
            })
          }
          placeholder="Image URL"
        />
        <div className="flex gap-2">
          <input
            className="flex-1 px-4 py-2 border rounded"
            type="number"
            value={venue.price}
            onChange={(e) => setVenue({ ...venue, price: +e.target.value })}
            placeholder="Price"
          />
          <input
            className="flex-1 px-4 py-2 border rounded"
            type="number"
            value={venue.maxGuests}
            onChange={(e) => setVenue({ ...venue, maxGuests: +e.target.value })}
            placeholder="Guests"
          />
        </div>
        <fieldset className="flex gap-4">
          {["wifi", "parking", "breakfast", "pets"].map((key) => (
            <label key={key}>
              <input
                type="checkbox"
                checked={venue.meta[key as keyof typeof venue.meta]}
                onChange={() =>
                  setVenue({
                    ...venue,
                    meta: {
                      ...venue.meta,
                      [key]: !venue.meta[key as keyof typeof venue.meta],
                    },
                  })
                }
              />{" "}
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
          ))}
        </fieldset>
        <input
          className="w-full px-4 py-2 border rounded"
          value={venue.location.address}
          onChange={(e) =>
            setVenue({ ...venue, location: { ...venue.location, address: e.target.value } })
          }
          placeholder="Address"
        />
        <div className="flex gap-2">
          <input
            className="flex-1 px-4 py-2 border rounded"
            value={venue.location.city}
            onChange={(e) =>
              setVenue({ ...venue, location: { ...venue.location, city: e.target.value } })
            }
            placeholder="City"
          />
          <input
            className="flex-1 px-4 py-2 border rounded"
            value={venue.location.zip}
            onChange={(e) =>
              setVenue({ ...venue, location: { ...venue.location, zip: e.target.value } })
            }
            placeholder="ZIP"
          />
        </div>
        <input
          className="w-full px-4 py-2 border rounded"
          value={venue.location.country}
          onChange={(e) =>
            setVenue({ ...venue, location: { ...venue.location, country: e.target.value } })
          }
          placeholder="Country"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold"
        >
          Update Venue
        </button>
      </form>
    </div>
  );
}

