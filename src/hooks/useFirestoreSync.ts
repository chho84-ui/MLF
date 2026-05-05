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

  // Load from Firestore when user logs in
  useEffect(() => {
    if (!user) {
      hasSynced.current = false;
      return;
    }

    async function load() {
      const ref = doc(db, 'users', user!.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        gameState.loadFromFirestore(snap.data());
      }
      hasSynced.current = true;
    }

    load();
  }, [user?.uid]);

  // Save to Firestore on state changes (debounced 2s)
  useEffect(() => {
    if (!user || !hasSynced.current) return;

    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      const { xp, level, levelResults, totalCorrect, totalAttempted, bestStreak, playerName } = gameState;
      const ref = doc(db, 'users', user.uid);
      await setDoc(ref, { xp, level, levelResults, totalCorrect, totalAttempted, bestStreak, playerName }, { merge: true });
    }, 2000);

    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [
    user?.uid,
    gameState.xp,
    gameState.levelResults,
    gameState.totalCorrect,
    gameState.bestStreak,
    gameState.playerName,
  ]);
}
