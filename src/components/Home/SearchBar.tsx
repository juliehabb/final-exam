import React from "react";

type Props = {
  /** The current text value of the search input */
  value: string;
  /** Function to update the search value when the user types */
  onChange: (val: string) => void;
};

/**
 * A simple input field for searching venues.
 *
 * @param value - Current value of the input field.
 * @param onChange - Function called when the input value changes.
 */
export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search for venues..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg"
      />
    </div>
  );
}

