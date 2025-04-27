import React from "react";




function PhotoGallery() {
  // 1. Define your main photo and thumbnails
  const mainPhoto = "https://placehold.co/600x400";
  const thumbnails = [
    "https://placehold.co/150x100?text=",
    "https://placehold.co/150x100?text=",
    "https://placehold.co/150x100?text=",
    "https://placehold.co/150x100?text=",
  ];

  return (
    <div className="flex gap-4 p-6 bg-gray-50 rounded-2xl">
      <img
        className="w-1/3 h-auto rounded-2xl object-cover"
        src={mainPhoto}
        alt="Main"
      />
      <div className="grid grid-cols-2 gap-2 w-1/3 justify-items-center ">
        {thumbnails.map((url) => (
          <img
            key={url}
            className="w-full h-32 rounded-xl object-cover"
            src={url}
            alt="Thumbnail"
          />
        ))}
        <button className="text-sm text-gray-600 self-end justify-self-end">
          More photos
        </button>
      </div>
    </div>
  );
}

export default PhotoGallery;
