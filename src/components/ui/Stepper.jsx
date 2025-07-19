import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const Stepper = ({ currentStep, totalSteps }) => {
  return (
    <div className="relative flex justify-center items-center mb-6">
      <div className="absolute left-5 right-5 top-1/2 -translate-y-1/2 h-1 bg-gray-200 z-0 rounded-full"></div>
      <div className="flex justify-between w-full max-w-xs z-10">
        {[...Array(totalSteps)].map((_, index) => {
          const step = index + 1;
          return (
            <div
              key={step}
              className={`relative w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl transition-colors duration-300 shadow-md
                ${currentStep >= step ? 'bg-blue-600' : 'bg-gray-400'}`}
            >
              {currentStep > step ? <CheckCircle /> : step}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
