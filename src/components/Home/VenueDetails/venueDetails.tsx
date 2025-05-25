import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.module.css"
import { VenueDetail } from "../../../api/holidaze/venue";
import * as ReactDatePicker from "react-datepicker";
import { createBooking } from "../../../api/holidaze/bookings";

const DatePicker = ReactDatePicker.default;

type VenueDetailsProps = {
  venue: VenueDetail;
};

type Booking = {
  dateFrom: string;
  dateTo: string;
};

export default function VenueDetails({ venue }: VenueDetailsProps) {
  const { name, location, price, description, id } = venue;

  const [people, setPeople] = useState(2);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch(
          `https://v2.api.noroff.dev/holidaze/venues/${id}?_bookings=true`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "X-Noroff-API-Key": localStorage.getItem("apiKey")!,
            },
          }
        );

        const data = await res.json();
        const bookings: Booking[] = data.data.bookings || [];

        const blocked = getUnavailableDates(bookings);
        setUnavailableDates(blocked);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      }
    }

    fetchBookings();
  }, [id]);

  function getUnavailableDates(bookings: Booking[]) {
    const excluded: Date[] = [];

    bookings.forEach(({ dateFrom, dateTo }) => {
      const start = new Date(dateFrom);
      const end = new Date(dateTo);
      let current = new Date(start);

      while (current <= end) {
        excluded.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
    });

    return excluded;
  }

  const handleBooking = async () => {
    setBookingError(null);
    setBookingSuccess(false);

    if (!startDate || !endDate) {
      setBookingError("Select check-in and check-out dates.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setBookingError("You must be logged in.");
      return;
    }

    const payload = {
      dateFrom: startDate.toISOString(),
      dateTo: endDate.toISOString(),
      guests: people,
      venueId: id,
    };


    try {
      const response = await createBooking(payload, token);
      console.log(" Booking successful:", response);
      setBookingSuccess(true);
    } catch (err: any) {
      console.error(" Booking error:", err.message);
      setBookingError(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <main className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Venue Info */}
        <div className="bg-white p-6 rounded-2xl shadow-lg flex-1">
          <h1 className="text-2xl font-bold">{name}</h1>
          <span className="text-xl font-semibold">
            ${price} <span className="text-gray-500 text-base">per day</span>
          </span>
          <div className="text-gray-600 my-2">
            {location.address}, {location.city}
          </div>
          <p className="text-gray-700 my-4">{description}</p>
        </div>

        {/* Booking Section */}
        <div className="bg-white p-6 rounded-2xl shadow-lg flex-1">
          <h2 className="text-xl font-semibold mb-4">Book your stay</h2>

          {/* Calendar */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">Check-in</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              excludeDates={unavailableDates}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-sm font-medium text-gray-700">Check-out</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate || new Date()}
              excludeDates={unavailableDates}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Guest Counter */}
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

          <button
            onClick={handleBooking}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition"
          >
            Book
          </button>

          {/* Feedback */}
          {bookingError && <p className="text-red-500 mt-2">{bookingError}</p>}
          {bookingSuccess && <p className="text-green-600 mt-2">Booking successful!</p>}
        </div>
      </div>
    </main>
  );
}