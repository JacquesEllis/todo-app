// Manual mock for packages/frontend/src/firebase/index.ts
// Provides a minimal auth stub used across test files.
export const auth = {
  currentUser: {
    uid: 'test-uid',
    email: 'test@example.com',
    displayName: 'Test User',
  },
};
