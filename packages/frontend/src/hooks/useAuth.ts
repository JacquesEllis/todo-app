import { useState, useEffect } from 'react';
import { onAuthStateChanged }  from 'firebase/auth';
import type { User }           from 'firebase/auth';
import { auth }                from '../firebase';

interface UseAuthReturn {
  user:    User | null;
  loading: boolean;
}

/**
 * Subscribes to Firebase Auth state changes.
 * Returns the current user (or null) and a loading flag that is true
 * until the first auth state event has fired.
 */
export function useAuth(): UseAuthReturn {
  const [user,    setUser]    = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    // Clean up the listener when the component unmounts
    return unsubscribe;
  }, []); // empty deps — auth instance never changes

  return { user, loading };
}
