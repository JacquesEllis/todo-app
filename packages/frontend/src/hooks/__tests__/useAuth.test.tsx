/**
 * useAuth hook tests
 *
 * Covers:
 * - Unauthenticated state (null user, loading → false)
 * - Authenticated state (user object returned, loading → false)
 * - Loading state while auth is resolving
 */
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../useAuth';

// ---------------------------------------------------------------------------
// Firebase mock
// ---------------------------------------------------------------------------
let authStateCallback: ((user: unknown) => void) | null = null;
const unsubscribeMock = jest.fn();

jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn((_auth: unknown, callback: (user: unknown) => void) => {
    authStateCallback = callback;
    return unsubscribeMock;
  }),
  GoogleAuthProvider: jest.fn(),
  signInWithPopup: jest.fn().mockResolvedValue({}),
  signOut: jest.fn().mockResolvedValue({}),
  getAuth: jest.fn(() => ({})),
}));

jest.mock('../../firebase', () => ({
  auth: {},
}));

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('useAuth', () => {
  beforeEach(() => {
    authStateCallback = null;
    unsubscribeMock.mockClear();
  });

  it('starts in a loading state with no user', () => {
    const { result } = renderHook(() => useAuth());
    // Before the auth state callback fires, loading should be true
    expect(result.current.loading).toBe(true);
    expect(result.current.user).toBeNull();
  });

  it('sets user and clears loading when authenticated', () => {
    const { result } = renderHook(() => useAuth());
    const mockUser = { uid: 'test-uid', email: 'test@example.com', displayName: 'Test User' };

    act(() => {
      // Simulate Firebase firing the auth state callback with a user
      if (authStateCallback) authStateCallback(mockUser);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.loading).toBe(false);
  });

  it('sets user to null and clears loading when unauthenticated', () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      // Simulate Firebase firing the auth state callback with null (signed out)
      if (authStateCallback) authStateCallback(null);
    });

    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('calls the unsubscribe function on unmount', () => {
    const { unmount } = renderHook(() => useAuth());
    unmount();
    expect(unsubscribeMock).toHaveBeenCalledTimes(1);
  });
});
