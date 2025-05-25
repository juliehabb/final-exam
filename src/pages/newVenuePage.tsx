

import React, { FormEvent, useState } from "react";
import { useNavigate }      from "react-router-dom";
import { useCreateVenue } from "../hooks/useCreateVenues";
import type { NewVenueData } from "../api/holidaze/venues";

export default function NewVenuePage() {
    const navigate = useNavigate();
    const { createVenue, loading, error } = useCreateVenue();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [mediaUrl, setMediaUrl] = useState("");
    const [mediaAlt, setMediaAlt] = useState("");
    const [price, setPrice] = useState(0);
    const [maxGuests, setMaxGuests] = useState(1);
    const [wifi, setWifi] = useState(false);
    const [parking, setParking]  = useState(false);
    const [breakfast, setBreakfast]  = useState(false);
    const [pets, setPets] = useState(false);
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [country, setCountry] = useState("");

        async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const payload: NewVenueData = {
            name,
            description,
            media: mediaUrl 
            ? [{url: mediaUrl,alt: mediaAlt || "" }] 
            : [],
            price,
            maxGuests,
            rating: 0,
            meta: { wifi, parking, breakfast, pets },
            location: {address, city, zip, country},
        };

        try {
            await createVenue(payload);
            navigate("/profile");
        } catch (err:any) { 
            console.error("Failed to create venue:", err);
        }
    }


 return (
    <div className="relative max-w-lg mx-auto mt-16 p-6 bg-white rounded-2xl shadow-lg space-y-4">
        <button
         onClick={() => navigate(-1)}
         className=" absolute top-4 right-4 text-2xl text-gray-500 hover:text-blue-500"
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
            className="w-full px-4 py-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Venue name"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            className="w-full px-4 py-2 border rounded h-24"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Image URL</label>
          <input
            className="w-full px-4 py-2 border rounded"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            placeholder="Image URL"
          />
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block font-medium mb-1">Price</label>
            <input
              className="w-full px-4 py-2 border rounded"
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
              className="w-full px-4 py-2 border rounded"
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
            className="w-full px-4 py-2 border rounded"
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
              className="w-full px-4 py-2 border rounded"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">ZIP Code</label>
            <input
              className="w-full px-4 py-2 border rounded"
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
            className="w-full px-4 py-2 border rounded"
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
  );

    
}