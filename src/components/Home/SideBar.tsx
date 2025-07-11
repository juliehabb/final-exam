import React from "react";
import { FaHotel, FaBuilding, FaHome } from "react-icons/fa";

type Props = {
  onSelectType: (type: "hotel" | "apartment" | "home" | "") => void;
};

/**
 * Items to show in the sidebar.
 * Each item includes an icon and a label.
 */
const sidebarItems = [
  { icon: <FaHotel size={32} />, label: "Hotel", type: "hotel" },
  { icon: <FaBuilding size={32} />, label: "Apartment", type: "apartment" },
  { icon: <FaHome size={32} />, label: "Home", type: "home" },
];

/**
 * SideBar component that displays clickable buttons
 * for different types of venue categories.
 */
const SideBar = ({ onSelectType }: Props) => (
  <aside className="flex flex-col items-center gap-6 ">
    {sidebarItems.map((item) => (
      <button
        key={item.label}
        className="flex flex-col items-center justify-center gap-2 w-20 h-24 p-4 rounded-2xl shadow transition-all bg-white dark:bg-gray-700 hover:bg-blue-100 focus:outline-none"
        aria-label={item.label}
        onClick={() => onSelectType(item.type as "hotel" | "apartment" | "home")}
      >
        <span className="text-blue-400 dark:text-white">{item.icon}</span>
        <span className="text-xs text-gray-600 dark:text-white font-semibold text-center">{item.label}</span>
      </button>
    ))}

    <button
      onClick={() => onSelectType("")}
      className="text-sm mt-4 underline text-gray-500 hover:text-blue-500 dark:text-white"
    >
      Show All
    </button>
  </aside>
);

export default SideBar;