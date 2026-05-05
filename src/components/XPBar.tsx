import { useGameStore } from '../store/useGameStore';

export function XPBar() {
  const { xp, level, getXPProgress } = useGameStore();
  const { current, needed, percent } = getXPProgress();

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400 text-yellow-900 font-bold text-sm shadow-md">
        {level}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between text-xs text-white/70 mb-1">
          <span>Nivå {level}</span>
          <span>{current}/{needed} XP</span>
        </div>
        <div className="h-3 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full transition-all duration-700"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
      <div className="text-white/60 text-xs whitespace-nowrap">{xp} XP totalt</div>
    </div>
  );
}
