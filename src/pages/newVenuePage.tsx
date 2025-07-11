

import React, { FormEvent, useState } from "react";
import { useNavigate }      from "react-router-dom";
import { useCreateVenue } from "../hooks/useCreateVenues";
import type { NewVenueData } from "../api/holidaze/venues";

/**
 * Page for creating a new venue.
 * Uses form state for all input fields, submits to Holidaze API.
 */
export default function NewVenuePage() {
    const navigate = useNavigate();
    const { createVenue, loading, error } = useCreateVenue();
    const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [mediaUrls, setMediaUrls] = useState(["", "", "", "", ""]);
  const [price, setPrice] = useState(0);
  const [maxGuests, setMaxGuests] = useState(1);
  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [pets, setPets] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");

    /**
   * Submits form data to create a new venue.
   */
        async function handleSubmit(e: FormEvent) {
        e.preventDefault();

    const media = mediaUrls
      .filter((url) => url.trim() !== "")
      .map((url) => ({ url, alt: name }));

    const payload: NewVenueData = {
      name,
      description,
      media,
      price,
      maxGuests,
      rating: 0,
      meta: { wifi, parking, breakfast, pets },
      location: { address, city, zip, country },
    };

    try {
      await createVenue(payload);
      navigate("/profile");
    } catch (err: any) {
      console.error("Failed to create venue:", err);
    }
  }


 return (
  <main className="dark:bg-gray-800 dark:text-white pt-16 pb-16">
    <div className="relative max-w-lg mx-auto  p-6 bg-white rounded-2xl shadow-lg space-y-4 dark:bg-gray-700">
        <button
         onClick={() => navigate(-1)}
         className=" absolute top-4 right-4 text-2xl text-gray-500 dark:text-white hover:text-blue-500"
        aria-label="Close create venue form"
         >
         ×
       </button>

      <h1 className="text-2xl font-bold">Create New Venue</h1>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            className="w-full dark:bg-gray-600 dark:border-transparent px-4 py-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Venue name"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            className="w-full px-4 py-2 border rounded h-24 dark:bg-gray-600 dark:border-transparent"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Image URLs (up to 5)</label>
          {mediaUrls.map((url, index) => (
            <input
              key={index}
              type="url"
              placeholder={`Image ${index + 1}`}
              className="w-full border p-2 rounded mb-2 dark:bg-gray-600 dark:border-transparent"
              value={url}
              onChange={(e) => {
                const updated = [...mediaUrls];
                updated[index] = e.target.value;
                setMediaUrls(updated);
              }}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block font-medium mb-1">Price</label>
            <input
              className="w-full px-4 py-2 border rounded dark:bg-gray-600 dark:border-transparent"
              type="number"
              value={price}
              onChange={(e) => setPrice(+e.target.value)}
              placeholder="Price"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">Max Guests</label>
            <input
              className="w-full px-4 py-2 border rounded dark:bg-gray-600 dark:border-transparent"
              type="number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(+e.target.value)}
              placeholder="Max guests"
              required
            />
          </div>
        </div>

        <fieldset className="space-y-2">
          <legend className="font-medium">Amenities</legend>
          <div className="flex gap-4 flex-wrap">
            <label>
              <input type="checkbox" checked={wifi} onChange={() => setWifi(!wifi)} /> Wifi
            </label>
            <label>
              <input type="checkbox" checked={parking} onChange={() => setParking(!parking)} /> Parking
            </label>
            <label>
              <input type="checkbox" checked={breakfast} onChange={() => setBreakfast(!breakfast)} /> Breakfast
            </label>
            <label>
              <input type="checkbox" checked={pets} onChange={() => setPets(!pets)} /> Pets
            </label>
          </div>
        </fieldset>

        <div>
          <label className="block font-medium mb-1">Address</label>
          <input
            className="w-full px-4 py-2 border rounded dark:bg-gray-600 dark:border-transparent"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            required
          />
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block font-medium mb-1">City</label>
            <input
              className="w-full px-4 py-2 border rounded dark:bg-gray-600 dark:border-transparent"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">ZIP Code</label>
            <input
              className="w-full px-4 py-2 border rounded dark:bg-gray-600 dark:border-transparent"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="ZIP"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Country</label>
          <input
            className="w-full px-4 py-2 border rounded dark:bg-gray-600 dark:border-transparent"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-400 text-black py-3 rounded-lg font-semibold"
        >
          {loading ? "Creating…" : "Create Venue"}
        </button>
      </form>
    </div>
  </main>
    
  );
}