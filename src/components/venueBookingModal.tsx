import React, { useEffect} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css"
import type { Booking } from "../api/holidaze/bookings";

interface VenueBookingModalProps {
  venueName: string;
  bookings: Booking[];
  onClose: () => void;
}

export function VenueBookingModal({ venueName, bookings, onClose }: VenueBookingModalProps) {
  useEffect(() => {
    console.log("🧾 Bookings received in modal:", bookings);
  }, [bookings]);

  return (
    <div className="modal">
    </div>
  );
}