import React, { ReactNode } from "react";

/**
 * Props for the Panel component.
 * @property title - The panel's heading text.
 * @property actions - Optional elements (like buttons) displayed next to the title.
 * @property children - Content inside the panel.
 */
type PanelProps = {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
};

/**
 * A reusable layout panel with a title, optional actions, and content area.
 *
 * Typically used to wrap a section like bookings or venues on a profile page.
 */
export function Panel({ title, actions, children }: PanelProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-2xl shadow-lg flex-1 space-y-4 dark:bg-gray-700 dark:text-white">
      <div className="flex justify-between items-center ">
        <h2 className="text-2xl font-semibold ">{title}</h2>
        {actions && <div>{actions}</div>}
      </div>
      <div className="space-y-3 ">{children}</div>
    </div>
  );
}