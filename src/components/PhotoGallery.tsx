import React from "react";
import { useState } from "react";

type PhotoGalleryProps = {
  images: string[];
};

export default function PhotoGallery({ images }: PhotoGalleryProps) {
  const THUMB_COUNT = 4;
  const hasMore = images.length > THUMB_COUNT;
  const visible = images.slice(0, THUMB_COUNT);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  function openAt(i: number) {
    setCurrentIndex(i);
    setLightboxOpen(true);
  }

  return (
    <div className="w-full p-6">
      <div className="flex flex-col lg:flex-row gap-4 bg-gray-50 rounded-2xl overflow-hidden">
        {/* Big featured image */}
        <div
          className="flex-1 flex justify-center items-center p-4 cursor-pointer"
          onClick={() => openAt(0)}
        >
          <img
            src={images[0]}
            alt="Featured"
            className="w-full max-w-md rounded object-cover"
            loading="lazy"
          />
        </div>

        {/* Miniature images with overlay */}
        <div className="w-full lg:w-1/3 grid grid-cols-2 gap-2 p-4 justify-items-center">
          {visible.map((src, idx) => {
            if (hasMore && idx === THUMB_COUNT - 1) {
              const moreCount = images.length - THUMB_COUNT + 1;
              return (
                <div
                  key={idx}
                  className="relative rounded overflow-hidden cursor-pointer"
                  onClick={() => openAt(idx)}
                >
                  <img
                    src={src}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-32 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">
                      +{moreCount}
                    </span>
                  </div>
                </div>
              );
            }
            return (
              <div
                key={idx}
                className="rounded overflow-hidden cursor-pointer"
                onClick={() => openAt(idx)}
              >
                <img
                  src={src}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-32 object-cover"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <button
            className="absolute top-4 right-4 text-white text-3xl"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
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