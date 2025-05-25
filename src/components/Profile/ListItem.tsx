import React, { ReactNode } from "react";

/**
 * Props for the ListItem component.
 * @property image - URL of the image to display.
 * @property title - Main title text.
 * @property subtitle - Secondary text below the title.
 * @property actions - Optional action elements (e.g., buttons or icons).
 */
type ListItemProps = {
  image: string;
  title: string;
  subtitle: string;
  actions?: ReactNode;
};

/**
 * A reusable list item component that shows an image, title, subtitle,
 * and optional action buttons/icons.
 *
 * Useful for things like venue or booking items in a list.
 */
export function ListItem({ image, title, subtitle, actions }: ListItemProps) {
  return (
    <div className="flex items-center bg-white rounded-xl shadow p-4">
      <img
        src={image}
        alt={title}
        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
      />
      <div className="flex-1 px-4">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-gray-500">{subtitle}</p>
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}