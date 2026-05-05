import { useEffect, useState } from 'react';

interface FloatingXPProps {
  amount: number;
  onDone: () => void;
}

export function FloatingXP({ amount, onDone }: FloatingXPProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onDone();
    }, 900);
    return () => clearTimeout(timer);
  }, [onDone]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
      <div className="animate-float-up text-3xl font-black text-yellow-400 drop-shadow-lg">
        +{amount} XP
      </div>
    </div>
  );
}
