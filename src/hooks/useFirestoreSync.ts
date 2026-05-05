import { useEffect, useRef } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuthStore } from '../store/useAuthStore';
import { useGameStore } from '../store/useGameStore';

export function useFirestoreSync() {
  const user = useAuthStore((s) => s.user);
  const gameState = useGameStore();
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasSynced = useRef(false);

  useEffect(() => {
    if (!user) { hasSynced.current = false; return; }
    async function load() {
      const ref = doc(db, 'users', user!.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) gameState.loadFromFirestore(snap.data());
      hasSynced.current = true;
    }
    load();
  }, [user?.uid]);

  useEffect(() => {
    if (!user || !hasSynced.current) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      const { xp, level, levelResults, totalCorrect, totalAttempted, bestStreak, playerName } = gameState;

      // Save private game state
      await setDoc(
        doc(db, 'users', user.uid),
        { xp, level, levelResults, totalCorrect, totalAttempted, bestStreak, playerName },
        { merge: true }
      );

      // Save public leaderboard entry (only public fields)
      await setDoc(
        doc(db, 'leaderboard', user.uid),
        {
          playerName: playerName || user.displayName || 'Anonym',
          photoURL: user.photoURL ?? null,
          xp,
          level,
          totalCorrect,
          bestStreak,
          updatedAt: new Date(),
        },
        { merge: true }
      );
    }, 2000);

    return () => { if (saveTimer.current) clearTimeout(saveTimer.current); };
  }, [
    user?.uid,
    gameState.xp,
    gameState.levelResults,
    gameState.totalCorrect,
    gameState.bestStreak,
    gameState.playerName,
  ]);
}
