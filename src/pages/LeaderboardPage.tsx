import { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuthStore } from '../store/useAuthStore';

interface LeaderboardEntry {
  uid: string;
  playerName: string;
  photoURL: string | null;
  xp: number;
  level: number;
  totalCorrect: number;
  bestStreak: number;
}

const MEDALS = ['🥇', '🥈', '🥉'];
const PODIUM_COLORS = [
  { bg: 'from-yellow-400 to-amber-500', height: 'h-24', text: 'text-yellow-900', badge: 'bg-yellow-100 text-yellow-800' },
  { bg: 'from-gray-300 to-gray-400', height: 'h-16', text: 'text-gray-700', badge: 'bg-gray-100 text-gray-700' },
  { bg: 'from-amber-600 to-amber-700', height: 'h-12', text: 'text-amber-100', badge: 'bg-amber-100 text-amber-800' },
];

function Avatar({ entry, size = 'md' }: { entry: LeaderboardEntry; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'w-8 h-8 text-sm', md: 'w-12 h-12 text-lg', lg: 'w-16 h-16 text-2xl' };
  return entry.photoURL ? (
    <img src={entry.photoURL} alt={entry.playerName} className={`${sizes[size]} rounded-full border-2 border-white shadow`} />
  ) : (
    <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 border-2 border-white shadow flex items-center justify-center font-black text-white`}>
      {entry.playerName?.[0]?.toUpperCase() ?? '?'}
    </div>
  );
}

export function LeaderboardPage() {
  const user = useAuthStore((s) => s.user);
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'leaderboard'), orderBy('xp', 'desc'), limit(50));
    const unsub = onSnapshot(q, (snap) => {
      setEntries(snap.docs.map((d) => ({ uid: d.id, ...d.data() } as LeaderboardEntry)));
      setLoading(false);
    });
    return unsub;
  }, []);

  const top3 = entries.slice(0, 3);
  const rest = entries.slice(3);
  const myRank = entries.findIndex((e) => e.uid === user?.uid) + 1;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white">
        <div className="max-w-2xl mx-auto px-4 py-8 text-center">
          <div className="text-5xl mb-2">🏆</div>
          <h1 className="text-3xl font-black">Toppliste</h1>
          <p className="text-yellow-100 mt-1">Hvem er MatteMester?</p>
          {myRank > 0 && (
            <div className="mt-3 inline-block bg-white/20 rounded-full px-4 py-1.5 text-sm font-bold">
              Du er på plass #{myRank}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {loading ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-3 animate-spin-slow">⏳</div>
            <p>Laster toppliste...</p>
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-3">🌱</div>
            <p>Ingen på listen ennå — du kan bli #1!</p>
          </div>
        ) : (
          <>
            {/* Podium — top 3 */}
            {top3.length >= 1 && (
              <div className="mb-8">
                <div className="flex items-end justify-center gap-3 mb-2">
                  {/* Order: 2nd, 1st, 3rd */}
                  {[top3[1], top3[0], top3[2]].map((entry, visualIndex) => {
                    if (!entry) return <div key={visualIndex} className="w-24" />;
                    const rankIndex = visualIndex === 0 ? 1 : visualIndex === 1 ? 0 : 2;
                    const colors = PODIUM_COLORS[rankIndex];
                    const isMe = entry.uid === user?.uid;

                    return (
                      <div key={entry.uid} className="flex flex-col items-center gap-2 w-28">
                        {isMe && (
                          <span className="text-xs bg-indigo-100 text-indigo-600 font-bold px-2 py-0.5 rounded-full">Du!</span>
                        )}
                        <Avatar entry={entry} size={rankIndex === 0 ? 'lg' : 'md'} />
                        <span className="text-2xl">{MEDALS[rankIndex]}</span>
                        <p className="text-sm font-bold text-gray-800 text-center leading-tight truncate w-full text-center">
                          {entry.playerName}
                        </p>
                        <p className="text-xs text-gray-500 font-semibold">{entry.xp} XP</p>
                        <div className={`w-full bg-gradient-to-t ${colors.bg} ${colors.height} rounded-t-xl flex items-start justify-center pt-2`}>
                          <span className={`font-black text-lg ${colors.text}`}>#{rankIndex + 1}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Ranked list — 4th and below */}
            {rest.length > 0 && (
              <div className="space-y-2">
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Andre spillere</h2>
                {rest.map((entry, i) => {
                  const rank = i + 4;
                  const isMe = entry.uid === user?.uid;
                  return (
                    <div
                      key={entry.uid}
                      className={`flex items-center gap-4 bg-white rounded-2xl px-4 py-3 border shadow-sm transition-all animate-slide-in
                        ${isMe ? 'border-indigo-300 ring-2 ring-indigo-200' : 'border-gray-100'}
                      `}
                      style={{ animationDelay: `${i * 0.05}s` }}
                    >
                      <span className="text-gray-400 font-black text-lg w-8 text-center">#{rank}</span>
                      <Avatar entry={entry} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-800 truncate">
                          {entry.playerName}
                          {isMe && <span className="ml-2 text-xs text-indigo-500 font-semibold">← deg</span>}
                        </p>
                        <p className="text-xs text-gray-400">
                          Nivå {entry.level} · {entry.totalCorrect} riktige
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-black text-indigo-600">{entry.xp} XP</p>
                        {entry.bestStreak >= 3 && (
                          <p className="text-xs text-orange-500 font-bold">🔥 {entry.bestStreak}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
