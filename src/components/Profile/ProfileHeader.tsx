import React from "react";

type ProfileHeaderProps = {
    avatarUrl: string;
    name: string;
    bio: string;
};

export function ProfileHeader ({ avatarUrl, name, bio }: ProfileHeaderProps) {
    return (
        <div className="relative bg-gradient-to-r from-accent-light to-accent p-16">
          <div className="absolute inset-x-0 bottom-0 flex justify-center -mb-12">
            <img
              src={avatarUrl}
              alt={`${name} avatar`}
              className="w-24 h-24 rounded-full border-4 border-white object-cover"
            />
          </div>
          <div className="pt-20 text-center">
            <h1 className="text-3xl font-bold">{name}</h1>
            <p className="mt-2 text-gray-700 max-w-xl mx-auto">{bio}</p>
          </div>
        </div>
      );
}