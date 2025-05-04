import React, { ReactNode } from "react";

type PanelProps = {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function Panel({ title, actions, children }: PanelProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-2xl shadow-lg flex-1 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">{title}</h2>
        {actions && <div>{actions}</div>}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}