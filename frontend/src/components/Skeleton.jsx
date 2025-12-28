import React from 'react';

export const MovieCardSkeleton = () => {
  return (
    <div className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300">
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="skeleton skeleton-img"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 transition-opacity duration-300"></div>
      </div>
      <div className="p-4 flex flex-col flex-grow bg-gradient-to-b from-gray-800/90 to-gray-900/90 backdrop-blur">
        <div className="skeleton skeleton-line w-full mb-3"></div>
        <div className="skeleton skeleton-subline mb-4"></div>
        <div className="skeleton skeleton-button mt-auto"></div>
      </div>
    </div>
  );
};

export const InlineSkeleton = ({ width = 'w-full', height = 'h-6', className = '' }) => (
  <div className={`skeleton ${width} ${height} ${className}`}></div>
);

export default function Skeleton() {
  return null;
}
