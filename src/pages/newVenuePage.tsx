

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
            const result = await createVenue(payload);
            console.log(" Created venue response:", result);
            console.log(" New venue data:", result.data);
            navigate("/profile");
        } catch (err:any) { 
            console.error("Failed to create venue:", err);
        }
    }


 return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-4">
      <h1 className="text-2xl font-bold">Create New Venue</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full px-4 py-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Venue name"
          required
        />
        <textarea
          className="w-full px-4 py-2 border rounded h-24"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          className="w-full px-4 py-2 border rounded"
          value={mediaUrl}
          onChange={(e) => setMediaUrl(e.target.value)}
          placeholder="Image URL"
        />
        <div className="flex gap-2">
          <input
            className="flex-1 px-4 py-2 border rounded"
            type="number"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
            placeholder="Price"
            required
          />
          <input
            className="flex-1 px-4 py-2 border rounded"
            type="number"
            value={maxGuests}
            onChange={(e) => setMaxGuests(+e.target.value)}
            placeholder="Max guests"
            required
          />
        </div>
        <fieldset className="flex gap-4">
          <label>
            <input
              type="checkbox"
              checked={wifi}
              onChange={() => setWifi((v) => !v)}
            />{" "}
            Wifi
          </label>
          <label>
            <input
              type="checkbox"
              checked={parking}
              onChange={() => setParking((v) => !v)}
            />{" "}
            Parking
          </label>
          <label>
            <input
              type="checkbox"
              checked={breakfast}
              onChange={() => setBreakfast((v) => !v)}
            />{" "}
            Breakfast
          </label>
          <label>
            <input
              type="checkbox"
              checked={pets}
              onChange={() => setPets((v) => !v)}
            />{" "}
            Pets
          </label>
        </fieldset>
        <input
          className="w-full px-4 py-2 border rounded"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          required
        />
        <div className="flex gap-2">
          <input
            className="flex-1 px-4 py-2 border rounded"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            required
          />
          <input
            className="flex-1 px-4 py-2 border rounded"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="ZIP"
            required
          />
        </div>
        <input
          className="w-full px-4 py-2 border rounded"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent text-white py-3 rounded-lg font-semibold"
        >
          {loading ? "Creating…" : "Create Venue"}
        </button>
      </form>
    </div>
  );

    
}