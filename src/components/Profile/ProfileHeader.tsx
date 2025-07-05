import React from "react";

/**
 * Props for the ProfileHeader component.
 */
type ProfileHeaderProps = {
  avatarUrl: string;
  name: string;
  bio: string;
  editButton?: React.ReactNode;
};

/**
 * Displays a user's profile banner, avatar, name, and bio.
 * Used at the top of a profile page to visually represent the logged-in user.
 */
export function ProfileHeader({ avatarUrl, name, bio, editButton }: ProfileHeaderProps) {
  return (
    <div className="relative">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-500 h-48 w-full relative">
        {editButton}
      </div>

      {/* Avatar */}
      <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
        <img
          src={avatarUrl}
          alt={`${name} avatar`}
          className="w-28 h-28 rounded-full border-4 border-white object-cover"
        />
      </div>

      {/* Name + Bio */}
      <div className="mt-20 text-center px-4">
        <h1 className="text-2xl font-bold">{name}</h1>
        <p className="text-gray-700 mt-2">{bio}</p>
      </div>
    </div>
  );
}