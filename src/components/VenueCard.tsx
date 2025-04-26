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
            <div>
                {/* Title and Rating */}
                <div>
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <div>
                        <span>{rating}</span>
                        <span>★</span>
                    </div>
                </div>
                {/* Location */}
                <div>{location}</div>
                {/* Amenities */}
                <div>
                    {amenities.map((amenity) => (
                    <div key={amenity}>
                        {amenity}
                    </div>
                    ))}
                </div>
                {/* Price */}
                <div>
                    <span>Per day:</span>
                    <span>${price}</span>
                </div>
            </div>
        </a>
    );
}

export default VenueCard;