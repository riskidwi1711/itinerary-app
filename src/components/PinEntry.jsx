import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowLeft } from 'lucide-react';

const LivinStylePinEntry = ({ onPinVerified }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInput = (val) => {
    if (success || pin.length >= 6) return;
    setPin((prev) => prev + val);
    setError(false);
    if ('vibrate' in navigator) navigator.vibrate(50);
  };

  const handleBackspace = () => {
    if (success) return;
    setPin((prev) => prev.slice(0, -1));
    if ('vibrate' in navigator) navigator.vibrate(50);
  };

  useEffect(() => {
    if (pin.length === 6) {
      let actor = null;
      if (pin === '010502') {
        actor = 'aulia';
      } else if (pin === '090500') {
        actor = 'riski';
      }

      if (actor) {
        setSuccess(true);
        setTimeout(() => {
          onPinVerified?.(actor);
        }, 1500);
      } else {
        setError(true);
        setTimeout(() => setPin(''), 500);
      }
    }
  }, [pin, onPinVerified]);

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white z-[9999] flex flex-col justify-center items-center">
      <div className="max-w-md w-full fixed mx-auto flex flex-col items-center justify-center p-6">
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold mb-2">Masukkan PIN Kamu</h2>
          <p className="text-sm text-white/70">6 digit PIN untuk melanjutkan</p>
        </div>

        {/* PIN dots */}
        <div className="flex gap-4 mb-6">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-4 h-4 rounded-full border-2 ${pin.length > i ? 'bg-white border-white' : 'border-white/50'
                }`}
              animate={{ scale: pin.length > i ? 1.2 : 1 }}
              transition={{ type: 'spring', stiffness: 400 }}
            />
          ))}
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-300 mb-4 text-sm"
            >
              PIN salah. Coba lagi.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Success Overlay */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute w-screen h-screen bg-green-500/90 flex flex-col items-center justify-center"
            >
              <CheckCircle className="w-20 h-20 mb-4" />
              <p className="text-xl font-bold">PIN Benar</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Virtual Number Pad */}
        {!success && (
          <div className="grid grid-cols-3 gap-4 w-full mt-8 text-white text-2xl font-bold">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <button
                key={n}
                onClick={() => handleInput(String(n))}
                className="bg-white/20 rounded-xl py-4 hover:bg-white/30 active:scale-95 transition"
              >
                {n}
              </button>
            ))}
            <div></div>
            <button
              onClick={() => handleInput('0')}
              className="bg-white/20 rounded-xl py-4 hover:bg-white/30 active:scale-95 transition"
            >
              0
            </button>
            <button
              onClick={handleBackspace}
              className="bg-white/20 rounded-xl py-4 flex items-center justify-center hover:bg-white/30 active:scale-95 transition"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LivinStylePinEntry;
