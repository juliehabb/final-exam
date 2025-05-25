import React from "react";
import { FaHotel, FaBuilding, FaHome } from "react-icons/fa";

/**
 * Items to show in the sidebar.
 * Each item includes an icon and a label.
 */
const sidebarItems = [
  { icon: <FaHotel size={32} />, label: "Hotel" },
  { icon: <FaBuilding size={32} />, label: "Apartment" },
  { icon: <FaHome size={32} />, label: "Home" },
];

/**
 * SideBar component that displays clickable buttons
 * for different types of venue categories.
 */
const SideBar = () => (
  <aside className=" flex flex-col items-center gap-6">
    {sidebarItems.map((item) => (
      <button
        key={item.label}
        className="flex flex-col items-center justify-center gap-2 w-20 h-24 p-4 rounded-2xl shadow transition-all bg-white hover:bg-blue-100 focus:outline-none"
        aria-label={item.label}
      >
        <span className="text-blue-400">{item.icon}</span>
        <span className="text-xs text-gray-600 font-semibold text-center">{item.label}</span>
      </button>
    ))}
  </aside>
);

export default SideBar;