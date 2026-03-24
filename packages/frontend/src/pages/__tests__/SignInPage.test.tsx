/**
 * SignInPage tests
 *
 * Covers:
 * - Renders sign-in button
 * - Calls signInWithPopup when button is clicked (happy path)
 * - Shows error message when sign-in fails (auth rejection)
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignInPage from '../SignInPage';

// ---------------------------------------------------------------------------
// Firebase mock
// ---------------------------------------------------------------------------
const mockSignInWithPopup = jest.fn();

jest.mock('firebase/auth', () => ({
  GoogleAuthProvider: jest.fn().mockImplementation(() => ({})),
  signInWithPopup: (...args: unknown[]) => mockSignInWithPopup(...args),
  getAuth: jest.fn(() => ({})),
  onAuthStateChanged: jest.fn(),
  signOut: jest.fn().mockResolvedValue({}),
}));

jest.mock('../../firebase', () => ({
  auth: {},
}));

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('SignInPage', () => {
  beforeEach(() => {
    mockSignInWithPopup.mockReset();
  });

  it('renders the sign-in button', () => {
    render(<SignInPage />);
    expect(
      screen.getByRole('button', { name: /sign in with google/i }),
    ).toBeInTheDocument();
  });

  it('renders the app heading', () => {
    render(<SignInPage />);
    // The heading text is sourced from the UX spec (docs/ux/ in ai-bot-profiles)
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('calls signInWithPopup when sign-in button is clicked (happy path)', async () => {
    mockSignInWithPopup.mockResolvedValueOnce({ user: { uid: 'test-uid' } });
    render(<SignInPage />);

    fireEvent.click(screen.getByRole('button', { name: /sign in with google/i }));

    await waitFor(() => {
      expect(mockSignInWithPopup).toHaveBeenCalledTimes(1);
    });
  });

  it('shows an error message when sign-in fails (auth rejection)', async () => {
    mockSignInWithPopup.mockRejectedValueOnce(new Error('popup-closed-by-user'));
    render(<SignInPage />);

    fireEvent.click(screen.getByRole('button', { name: /sign in with google/i }));

    await waitFor(() => {
      // An error message should be visible to the user
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  it('does not show an error message before any interaction', () => {
    render(<SignInPage />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
