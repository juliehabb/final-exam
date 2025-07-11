import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css"

/**
 * Represents a single booking with start and end dates.
 */
type Booking = {
    dateFrom: string;
    dateTo: string;
};


/**
 * Props for the VenueBookingModal component.
 * @property venueName - The name of the venue being viewed.
 * @property bookings - A list of bookings for this venue.
 * @property onClose - A callback to close the modal.
 */
type Props = {
    venueName: string;
    bookings: Booking[];
    onClose: () => void;
};

/**
 * Displays a modal with a calendar highlighting all booked dates for a specific venue.
 * Useful for venue managers to see which dates are already reserved.
 */
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
        <div className="fixed inset-0 bg-black dark:text-white  bg-opacity-50 z-50 flex items-center justify-center ">
            <div className="bg-white p-6 rounded-xl max-w-md w-full relative dark:bg-gray-700">
                <button 
                onClick={onClose}
                className="absolute top-3 right-4 text-gray-700 dark:text-white  hover:text-red-600"
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