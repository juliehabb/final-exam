import PhotoGallery from "../../PhotoGallery";
import React from "react";
import { useState } from "react";



export default function VenueDetails() {
    const title = "Beautiful villa";
    const location = "Bergen, Vestland";
    const price = 100;
    const description =
      "Lorem ipsum dolor sit amet consectetur. Morbi sit egestas sapien tristique molestie leo.";
    const offers = ["Free wifi", "Breakfast included", "Parking", "Kitchen"];
    const notOffers = ["Pets"];
    const renter = { id: 1, name: "John Doe" };
  
    // Placeholder state for calendar & people count
    const [people, setPeople] = useState(2);
  
    return (
      <main className="p-6 space-y-6">

  
        {/* Info- og booking-panel */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Venstrekort: Boliginfo */}
          <div className="bg-white p-6 rounded-2xl shadow-lg flex-1">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold">{title}</h1>
              <span className="text-xl font-semibold">
                {price}$ <span className="text-gray-500 text-base">per day</span>
              </span>
            </div>
            <div className="text-gray-600 my-2">📍 {location}</div>
            <p className="text-gray-700 my-4">{description}</p>
  
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Offers</h3>
                {offers.map((o) => (
                  <div key={o} className="flex items-center gap-2 mb-1">
                    <span className="w-3 h-3 bg-gray-200 rounded-sm" />
                    <span className="text-gray-700">{o}</span>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="font-semibold mb-2">Does not offer</h3>
                {notOffers.map((o) => (
                  <div key={o} className="flex items-center gap-2 mb-1">
                    <span className="w-3 h-3 bg-gray-200 rounded-sm" />
                    <span className="text-gray-700">{o}</span>
                  </div>
                ))}
              </div>
            </div>
  
            <div className="mt-6">
              <h3 className="font-semibold">Renter</h3>
              <a
                href={`/profile/${renter.id}`}
                className="text-blue-500 hover:underline"
              >
                {renter.name}
              </a>
            </div>
          </div>
  
          {/* Høyrrekort: Booking */}
          <div className="bg-white p-6 rounded-2xl shadow-lg flex-1">
            <h2 className="text-xl font-semibold mb-4">Book your stay</h2>
  
            {/* Placeholder for kalender */}
            <div className="h-64 bg-gray-100 rounded-xl mb-6 flex items-center justify-center">
              Calendar
            </div>
  
            <div className="flex items-center justify-between mb-6">
              <span>Number of people</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPeople((p) => Math.max(1, p - 1))}
                  className="w-8 h-8 bg-gray-200 rounded"
                >
                  −
                </button>
                <span>{people}</span>
                <button
                  onClick={() => setPeople((p) => p + 1)}
                  className="w-8 h-8 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            </div>
  
            <button className="w-full py-3 bg-accent text-white font-semibold rounded-xl">
              Book
            </button>
          </div>
        </div>
      </main>
    );
  }