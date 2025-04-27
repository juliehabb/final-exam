import React from "react";
import venues from "../mock-data/venues"
import VenueCard from "../components/VenueCard";
import NavBar from "../components/nav";

const HomePage = () => {
    return (
      <section className="flex flex-wrap gap-8 justify-center py-8">
        {venues.map((venue) => (
          <VenueCard
            key={venue.id}
            image={venue.image}
            title={venue.title}
            location={venue.location}
            rating={venue.rating}
            price={venue.price}
            amenities={venue.amenities}
            href={`/${venue.id}`}
          />
        ))}
      </section>
    );
  };

export default HomePage;