import React from "react";

type ProfileHeaderProps = {
  avatarUrl: string;
  name: string;
  bio: string;
  bannerUrl?: string;
  editButton?: React.ReactNode;
};

/**
 * Displays the user's banner, avatar, name, and bio.
 */
export function ProfileHeader({ avatarUrl, name, bio, bannerUrl, editButton }: ProfileHeaderProps) {
  return (
    <div className="bg-gray-100 overflow-hidden shadow-sm dark:bg-gray-700 dark:text-white">
      {/* Banner */}
      <div className="relative">
        <div className="w-full h-40 bg-blue-400 overflow-hidden">
          {bannerUrl && (
            <img
              src={bannerUrl}
              alt="Profile banner"
              className="object-cover w-full h-full"
            />
          )}
        </div>

        {/* Avatar */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-md bg-white">
          <img src={avatarUrl} alt={`${name}'s avatar`} className="w-full h-full object-cover" />
        </div>

        {/* Edit button in top-right corner */}
        {editButton}
      </div>

      {/* Name & Bio */}
      <div className="pt-16 pb-6 px-6 text-center ">
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-gray-600 text-sm mt-1 dark:text-white">{bio}</p>
      </div>
    </div>
  );
}