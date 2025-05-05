import React from "react";
import { useParams } from "react-router-dom";
import PhotoGallery from "../components/PhotoGallery";
import VenueDetails from "../components/Home/VenueDetails/venueDetails";
import { useVenue } from "../hooks/useVenue";


export default function VenuePage() {
    const { id } = useParams<{ id: string }>();
    const { venue, loading, error } = useVenue(id!);
  
    if (loading) return <p>Loading venue…</p>;
    if (error)   return <p className="text-red-500">Error: {error}</p>;
    if (!venue)  return <p>Venue not found</p>;
  
    return (
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <PhotoGallery images={venue.media.map((m) => m.url)} />
        <VenueDetails venue={venue} />
      </main>
    );
  }


