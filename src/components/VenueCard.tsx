import { Link } from "react-router-dom";


/**
 * Props for the VenueCard component.
 */
type VenueCardProps = {
  id: string;
  image: string;
  title: string;
  location: string;
  rating: number;
  price: number;
  amenities: string[];
};

/**
 * A card component to display venue information such as title, image, rating, and price.
 *
 * @param {VenueCardProps} props - Props including id, image, title, location, rating, price, and amenities
 */
export default function VenueCard({
  id,
  image,
  title,
  location,
  rating,
  price,
  amenities,
}: VenueCardProps) {
  return (
    <Link
  to={`/venue/${id}`}
  className="w-full bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition dark:bg-gray-700"
>
  {image ? (
    <img
      src={image}
      alt={title}
      className="w-full h-52 object-cover rounded-t-2xl"
    />
  ) : (
    <div className="w-full h-52 flex items-center justify-center bg-gray-200 text-gray-500 text-lg font-semibold rounded-t-2xl">
      No picture
    </div>
  )}

  <div className="p-6 dark:bg-gray-700">
    <div className="flex items-center justify-between mb-1">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="flex items-center gap-1">
        <span className="font-semibold text-lg">{rating}</span>
        <span className="text-yellow-400 text-lg">★</span>
      </div>
    </div>
    <div className="text-gray-500 mb-4 dark:text-gray-400">{location}</div>
    <div className="flex flex-wrap gap-3 mb-5">
      {amenities.map((amenity) => (
        <div
          key={amenity}
          className="flex items-center gap-1 bg-gray-200 text-gray-600 px-2 py-1 rounded-md text-sm"
        >
          {amenity}
        </div>
      ))}
    </div>
    <div className="flex items-end gap-1">
      <span className="text-gray-500 dark:text-gray-400 text-lg">Per day:</span>
      <span className="text-2xl font-bold">${price}</span>
    </div>
  </div>
</Link>
  );
}