import React from 'react';
import { MapPin } from 'lucide-react';

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-[9999]">
      {/* Simple icon */}
      <div className="mb-6">
        <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
          <MapPin size={32} className="text-white" />
        </div>
      </div>
      
      {/* App name */}
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Itinerary</h1>
      <p className="text-gray-600 mb-8">Your travel companion</p>
      
      {/* Loading dots */}
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
      </div>
    </div>
  );
};

export default SplashScreen;