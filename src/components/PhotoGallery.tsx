import React, { useState } from "react";


/**
 * Props for the PhotoGallery component.
 */
type PhotoGalleryProps = {
  images: string[];
};

/**
 * A responsive image gallery with 1 large photo and 4 small thumbnails in a 2x2 grid.
 * Empty slots are filled with grey placeholders.
 */
export default function PhotoGallery({ images }: PhotoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOpen = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const thumbnails = Array.from({ length: 4 }, (_, i) => images[i + 1]);

  return (
    <div className="p-6 w-full ">
      <div className="flex flex-col lg:flex-row gap-4 rounded-2xl overflow-hidden">
        {/* Large main image */}
        <div
          className="lg:w-2/3 w-full aspect-video cursor-pointer"
          onClick={() => handleOpen(0)}
        >
          {images[0] ? (
            <img
              src={images[0]}
              alt="Featured"
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-xl" />
          )}
        </div>

        {/* Thumbnail grid */}
        <div className="lg:w-1/1 w-full grid grid-cols-2 grid-rows-2 gap-2 content-center justify-items-center">
          {thumbnails.map((img, i) => (
            <div
              key={i}
              className="w-full aspect-video rounded-xl overflow-hidden cursor-pointer"
              onClick={() => img && handleOpen(i + 1)}
            >
              {img ? (
                <img
                  src={img}
                  alt={`Thumbnail ${i + 2}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <button
            className="absolute top-4 right-4 text-white text-3xl"
            onClick={() => setLightboxOpen(false)}
          >
            ×
          </button>
          <img
            src={images[currentIndex]}
            alt={`Enlarged ${currentIndex + 1}`}
            className="max-h-[90%] max-w-[90%] object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
}