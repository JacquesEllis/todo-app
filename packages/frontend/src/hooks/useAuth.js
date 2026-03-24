import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/index';
import { clearApolloCache } from '../apollo/client';

export function useAuth() {
  const [user, setUser]       = useState(undefined); // undefined = still loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        // Clear Apollo cache on sign-out so stale data is never served
        clearApolloCache().catch(() => {});
      }
      setUser(firebaseUser ?? null);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { user, loading };
}
