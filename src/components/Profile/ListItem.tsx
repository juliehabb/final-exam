import React, { ReactNode } from "react";

type ListItemProps = {
  image: string;
  title: string;
  subtitle: string;
  actions?: ReactNode;
};

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