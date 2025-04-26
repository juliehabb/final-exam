import React from "react";

type VenueCardPromps = {
    image: string;
    title: string;
    description: string;
    href: string;
}

function VenueCard({ image, title, description, href }: VenueCardPromps) {
    return (
        <a 
        href={href}
        >
            <img src={image} alt={title} />
            <div>
                <h5>{title}</h5>
                <p>{description}</p>
            </div>

        </a>

    );
}

export default VenueCard;