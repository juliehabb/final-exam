import React from "react";
import venues from "../mock-data/venues"
import VenueCard from "../components/VenueCard";
import NavBar from "../components/nav";
import SearchBar from "../components/Home/SearchBar";
import SideBar from "../components/Home/SideBar";

const HomePage = () => {
    return (
      <main>
        <section>
          <SearchBar />
          <a href="/venue">Venue</a>
          <a href="/profile">Profile</a>
          <a href="/register">Register</a>
          
        </section>
        <section className="flex flex-wrap gap-8 justify-center  " >
            <div>
                <SideBar/>
            </div>
          <div className="flex flex-wrap gap-8 justify-center py-8">
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
          </div>

        </section>
      </main>
    );
  };

export default HomePage;