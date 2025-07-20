import React, { useState, useEffect } from 'react';
import { CheckCircle, ArrowLeft, Shield, Lock } from 'lucide-react';
import { api } from '@src/services/api';

const LivinStylePinEntry = ({ onPinVerified }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shakeError, setShakeError] = useState(false);

  const handleInput = (val) => {
    if (success || pin.length >= 6) return;
    setPin((prev) => prev + val);
    setError(false);
    setShakeError(false);
    if ('vibrate' in navigator) navigator.vibrate(50);
  };

  const handleBackspace = () => {
    if (success) return;
    setPin((prev) => prev.slice(0, -1));
    if ('vibrate' in navigator) navigator.vibrate(50);
  };

  useEffect(() => {
    const verifyPin = async () => {
      if (pin.length === 6) {
        try {
          const response = await api.post('/verify-pin', { pin });
          if (response.data.success) {
            localStorage.setItem('sessionId', response.data.sessionId); // Store sessionId
            setSuccess(true);
            setTimeout(() => {
              onPinVerified?.(response.data.actorName);
            }, 2000);
          } else {
            setError(true);
            setShakeError(true);
            if ('vibrate' in navigator) navigator.vibrate([100, 50, 100]);
            setTimeout(() => {
              setPin('');
              setShakeError(false);
            }, 600);
          }
        } catch (err) {
          setError(true);
          setShakeError(true);
          if ('vibrate' in navigator) navigator.vibrate([100, 50, 100]);
          setTimeout(() => {
            setPin('');
            setShakeError(false);
          }, 600);
        }
      }
    };

    if (pin.length === 6) {
      verifyPin();
    }
  }, [pin, onPinVerified]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">

      <div className="relative w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Verifikasi PIN</h1>
          <p className="text-gray-600 text-sm">Masukkan 6 digit PIN untuk melanjutkan</p>
        </div>

        {/* PIN Input Display */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-6 border border-gray-200 shadow-sm">
          <div className="flex justify-center gap-3 mb-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all duration-200 ${
                  pin.length > i 
                    ? 'bg-blue-500 border-blue-500 shadow-lg shadow-blue-500/25' 
                    : 'border-gray-300 bg-white'
                } ${shakeError ? 'animate-shake' : ''}`}
              >
                {pin.length > i && (
                  <Lock className="w-5 h-5 text-white" />
                )}
              </div>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-center">
              <p className="text-red-400 text-sm font-medium">
                ❌ PIN salah. Silakan coba lagi
              </p>
            </div>
          )}
        </div>

        {/* Success Overlay */}
        {success && (
          <div className="fixed inset-0 bg-gradient-to-br from-green-600 to-emerald-600 flex flex-col items-center justify-center z-50 text-white">
            <div className="text-center flex flex-col justify-center items-center">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <CheckCircle className="w-12 h-12" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Berhasil!</h2>
              <p className="text-green-100">PIN terverifikasi dengan benar</p>
              
              {/* Loading animation */}
              <div className="mt-8 flex justify-center space-x-1">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}

        {/* Number Pad */}
        {!success && (
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <button
                key={n}
                onClick={() => handleInput(String(n))}
                className="h-16 bg-white border border-gray-200 rounded-2xl text-gray-900 text-xl font-semibold hover:bg-gray-50 active:scale-95 transition-all duration-150 shadow-sm hover:shadow-md"
              >
                {n}
              </button>
            ))}
            
            {/* Empty space */}
            <div></div>
            
            {/* Zero button */}
            <button
              onClick={() => handleInput('0')}
              className="h-16 bg-white border border-gray-200 rounded-2xl text-gray-900 text-xl font-semibold hover:bg-gray-50 active:scale-95 transition-all duration-150 shadow-sm hover:shadow-md"
            >
              0
            </button>
            
            {/* Backspace button */}
            <button
              onClick={handleBackspace}
              className="h-16 bg-white border border-gray-200 rounded-2xl text-gray-900 flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all duration-150 shadow-sm hover:shadow-md"
              disabled={pin.length === 0}
            >
              <ArrowLeft className={`w-6 h-6 ${pin.length === 0 ? 'opacity-30' : ''}`} />
            </button>
          </div>
        )}

        {/* Bottom hint */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-xs">
            🔒 Data Anda dilindungi dengan enkripsi end-to-end
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 20%, 40%, 60%, 80%, 100% {
            transform: translateX(0);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-5px);
          }
        }
        
        .animate-shake {
          animation: shake 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default LivinStylePinEntry;