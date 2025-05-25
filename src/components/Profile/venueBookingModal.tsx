import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css"

type Booking = {
    dateFrom: string;
    dateTo: string;
};

type Props = {
    venueName: string;
    bookings: Booking[];
    onClose: () => void;
};

export function VenueBookingModal({ venueName, bookings, onClose }: Props) {
    const datesBooked = bookings.flatMap((b) => {
        const start = new Date(b.dateFrom);
        const end = new Date(b.dateTo);
        const dates = [];
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            dates.push(new Date(d));
        }
        return dates;
    });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center ">
            <div className="bg-white p-6 rounded-xl max-w-md w-full relative">
                <button 
                onClick={onClose}
                className="absolute top-3 right-4 text-gray-500 hover:text-red-600"
                > 
                x
                </button>
                <h2 className="text-xl font-bold mb-4">{venueName} Bookings</h2>
                <DatePicker
                inline
                highlightDates={datesBooked}
                disabledKeyboardNavigation
                />
            </div>
        </div>
    );
}