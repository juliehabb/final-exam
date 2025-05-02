import React from "react";
import PhotoGallery from "../components/PhotoGallery";

const VenuePage = () => {
    //Moxk images
    const images = [
        "https://placehold.co/600x400?text=hey",
        "https://placehold.co/600x400?text=2",
        "https://placehold.co/600x400?text=3",
        "https://placehold.co/600x400?text=4",
        "https://placehold.co/600x400?text=5",
    ];


    return (
        <main>
            <section>
            <PhotoGallery images={images}/>
            </section>
            

        </main>
    );

};

export default VenuePage;


