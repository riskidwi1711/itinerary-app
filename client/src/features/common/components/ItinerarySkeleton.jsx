import React from 'react';
import { motion } from 'framer-motion';

const ItinerarySkeleton = () => {
  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto "
      >
        {/* Header Skeleton */}
        <div className="h-10 bg-gray-300 rounded-lg w-3/4 mb-6 animate-pulse"></div>

        {/* Image Slider Skeleton */}
        <div className="h-48 bg-gray-300 rounded-2xl mb-6 animate-pulse"></div>

        {/* Date Navigation Skeleton */}
        <div className="flex items-center justify-between bg-gray-200/50 rounded-2xl p-4 shadow-lg border border-white border-opacity-60 animate-pulse">
          <div className="h-8 w-1/3 bg-gray-300 rounded-lg"></div>
          <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
        </div>

        {/* Add Activity Button Skeleton */}
        <div className="h-12 bg-blue-400 rounded-full mb-6 animate-pulse"></div>

        {/* Activity List Skeletons */}
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-gray-200/50 p-4 rounded-2xl shadow-lg border border-white border-opacity-60 mb-4 animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-2/3 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ItinerarySkeleton;
