import { useEffect } from 'react';

interface LevelUpModalProps {
  newLevel: number;
  onClose: () => void;
}

export function LevelUpModal({ newLevel, onClose }: LevelUpModalProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="bg-white rounded-3xl p-8 text-center shadow-2xl animate-level-up max-w-sm mx-4">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-black text-indigo-600 mb-2">NIVÅ OPP!</h2>
        <p className="text-6xl font-black text-yellow-500 mb-4">{newLevel}</p>
        <p className="text-gray-600 text-lg">Du er nå på nivå {newLevel}!</p>
        <p className="text-gray-400 text-sm mt-2">Fortsett den gode jobben! 💪</p>
      </div>
    </div>
  );
}
