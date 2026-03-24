/**
 * Module-level mock for ../firebase used in Jest tests.
 * Place this file at src/__mocks__/firebase.ts and Jest will pick it up
 * automatically when tests call jest.mock('../firebase').
 */
export const auth = {
  currentUser: { uid: 'test-uid', email: 'test@example.com' },
};

export const app = {};
