import React, { ReactNode, FormEvent} from "react";
import { Link } from "react-router-dom";

type AuthFormProps = {
    title: string;
    submitLabel: string;
    onSubmit: (e: FormEvent) => void;
    children: ReactNode;
    bottomLinkText: string;
    bottomLinkTo: string;
};

export function AuthForm({
    title,
    submitLabel,
    onSubmit,
    children,
    bottomLinkText,
    bottomLinkTo,
  }: AuthFormProps) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* Accent bar */}
        <div className="h-2 w-24 bg-blue-400 mx-auto mb-6 rounded"></div>
  
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6">{title}</h1>
  
        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          {children}
          <button
            type="submit"
            className="w-full bg-blue-400 text-black py-3 rounded-lg font-semibold"
          >
            {submitLabel}
          </button>
        </form>
  
        {/* Bottom link */}
        <p className="text-center mt-4">
          <Link to={bottomLinkTo} className="text-gray-600 hover:underline">
            {bottomLinkText}
          </Link>
        </p>
      </div>
    );
  }