import React from "react";

type VenueCardPromps = {
    image: string;
    title: string;
    location: string;
    rating: number;
    price: number;
    amenities: string[];
    href: string;
}

function VenueCard({   image, title, location, rating, price, amenities, href }: VenueCardPromps) {
    return (
        <a 
        href={href} 
        className="block max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
        >
            {/* Image */}
            <img src={image} alt={title} className="w-full h-52 object-cover rounded-t-2xl" />
            {/* Info */}
            <div className="p-6">
                {/* Title and Rating */}
                <div className="flex items-center justify-between mb-1">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <div className="flex items-center gap-1">
                        <span className="font-semibold text-lg">{rating}</span>
                        <span className="text-yellow-400 text-lg">★</span>
                    </div>
                </div>
                {/* Location */}
                <div className="text-gray-500 mb-4">{location}</div>
                {/* Amenities */}
                <div className="flex gap-3 mb-5">
                    {amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-1 bg-gray-200 text-gray-600 px-2 py-1 rounded-md text-sm">
                        {amenity}
                    </div>
                    ))}
                </div>
                {/* Price */}
                <div className="flex items-end gap-1">
                    <span className="text-gray-500 text-lg ">Per day:</span>
                    <span className="text-2xl font-bold">${price}</span>
                </div>
            </div>
        </a>
    );
}

export default VenueCard;