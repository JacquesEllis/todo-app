import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import StatusPage from './StatusPage';
import { HELLO_QUERY } from '../apollo/operations';

const successMock = [
  {
    request: { query: HELLO_QUERY },
    result: {
      data: { hello: 'Hello, I am live' },
    },
  },
];

const errorMock = [
  {
    request: { query: HELLO_QUERY },
    error: new Error('Network error'),
  },
];

describe('StatusPage', () => {
  it('shows a loading state while the query is in flight', () => {
    render(
      <MockedProvider mocks={successMock} addTypename={false}>
        <StatusPage />
      </MockedProvider>
    );
    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
    expect(screen.getByText(/checking status/i)).toBeInTheDocument();
  });

  it('displays the hello message once the query resolves', async () => {
    render(
      <MockedProvider mocks={successMock} addTypename={false}>
        <StatusPage />
      </MockedProvider>
    );
    const message = await screen.findByTestId('hello-message');
    expect(message).toHaveTextContent('Hello, I am live');
  });

  it('shows an API is online label when the query succeeds', async () => {
    render(
      <MockedProvider mocks={successMock} addTypename={false}>
        <StatusPage />
      </MockedProvider>
    );
    expect(await screen.findByText(/api is online/i)).toBeInTheDocument();
  });

  it('shows an error state when the query fails', async () => {
    // Suppress expected Apollo console error
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <MockedProvider mocks={errorMock} addTypename={false}>
        <StatusPage />
      </MockedProvider>
    );
    const alert = await screen.findByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(screen.getByText(/could not reach the server/i)).toBeInTheDocument();

    consoleError.mockRestore();
  });

  it('shows the error message detail when available', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <MockedProvider mocks={errorMock} addTypename={false}>
        <StatusPage />
      </MockedProvider>
    );
    expect(await screen.findByText(/network error/i)).toBeInTheDocument();

    consoleError.mockRestore();
  });
});
