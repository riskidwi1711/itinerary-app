import React from 'react';

import { UserRound } from 'lucide-react';

const ActorSelectionModalContent = ({ onSelectActor, onClose, t }) => {
  // Remove useTranslation here as t is passed as a prop

  const handleActorClick = (actor) => {
    onSelectActor(actor);
    onClose();
  };

  return (
    <div className="flex justify-center space-x-4">
      <button
        onClick={() => handleActorClick('riski')}
        className="flex flex-col items-center p-4 bg-blue-100/70 rounded-xl shadow-md hover:bg-blue-200/70 transition duration-200 w-32 border border-blue-200"
      >
        <UserRound className="h-12 w-12 text-blue-600 mb-2" />
        <span className="text-lg font-semibold text-gray-800">Riski</span>
      </button>
      <button
        onClick={() => handleActorClick('aulia')}
        className="flex flex-col items-center p-4 bg-pink-100/70 rounded-xl shadow-md hover:bg-pink-200/70 transition duration-200 w-32 border border-pink-200"
      >
        <UserRound className="h-12 w-12 text-pink-600 mb-2" />
        <span className="text-lg font-semibold text-gray-800">Aulia</span>
      </button>
    </div>
  );
};

export default ActorSelectionModalContent;
