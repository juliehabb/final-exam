import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

type Props = {
  /** The current text value of the search input */
  value: string;
  /** Function to update the search value when the user types */
  onChange: (val: string) => void;
};

/**
 * A styled input + button for searching venues.
 */
export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="mb-4 mt-6 w-1/2 ">
      <div className="flex  ">
        <div className="relative flex-grow">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400  ">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>
          <input
            type="text"
            placeholder="Search for venues..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-600 dark:border-transparent"
          />
        </div>
        <button
          className="px-5 bg-blue-500 text-white font-semibold rounded-r-lg hover:bg-blue-600 transition"
          onClick={() => {}}
        >
          Search
        </button>
      </div>
    </div>
  );
}