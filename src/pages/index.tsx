import React from "react";
import VenueCard from "../components/VenueCard";

const HomePage = () => {
    return (
        <section>
            <h1> Home </h1>
            <h2>h</h2>
            <VenueCard
              image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
              title="Seaview villa"
              location="Bergen, Norway"
              rating={7.8}
              price={90}
              amenities={["Wifi", "Breakfast", "Parking"]}
              href="#"
            />
        </section>
    ) 
}

export default HomePage;