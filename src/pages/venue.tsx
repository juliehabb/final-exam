import React from "react";
import PhotoGallery from "../components/PhotoGallery";
import VenueDetails from "../components/Home/VenueDetails/venuePage";

const VenuePage = () => {
    //Mock images
    const images = [
        "https://placehold.co/600x400?text=hey",
        "https://placehold.co/600x400?text=2",
        "https://placehold.co/600x400?text=3",
        "https://placehold.co/600x400?text=4",
        "https://placehold.co/600x400?text=5",
    ];


    return (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <section>
            <PhotoGallery images={images}/>
            <VenueDetails></VenueDetails>
            </section>
            

        </main>
    );

};

export default VenuePage;


