import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/index.js';
import { client } from '../apollo/client.js';

export function useAuth() {
  const [user, setUser]       = useState(undefined); // undefined = loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        // Clear Apollo cache on sign-out so no stale data leaks
        await client.clearStore();
      }
      setUser(firebaseUser ?? null);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { user, loading };
}
