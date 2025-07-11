import React from "react";


export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full text-center py-4 border-t text-sm text-gray-500 dark:bg-gray-800 dark:text-white">
      © Holidaze {currentYear}
    </footer>
  );
}