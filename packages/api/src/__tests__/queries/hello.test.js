const { ApolloServer } = require('apollo-server-express');
const { createTestClient } = require('apollo-server-testing');

const typeDefs = require('../../schema');
const resolvers = require('../../resolvers');

/**
 * No Firebase calls are made by this resolver, so no firebase-admin
 * mock is required for these tests.
 */
function makeServer() {
  return new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ uid: null }),
  });
}

const HELLO_QUERY = `
  query {
    hello
  }
`;

describe('hello query', () => {
  it('returns "Hello, I am live"', async () => {
    const { query } = createTestClient(makeServer());
    const res = await query({ query: HELLO_QUERY });

    expect(res.errors).toBeUndefined();
    expect(res.data).toEqual({ hello: 'Hello, I am live' });
  });

  it('returns a non-empty string', async () => {
    const { query } = createTestClient(makeServer());
    const res = await query({ query: HELLO_QUERY });

    expect(typeof res.data.hello).toBe('string');
    expect(res.data.hello.length).toBeGreaterThan(0);
  });

  /**
   * Auth is out of scope for this resolver — the hello query is
   * intentionally public. This test documents that behaviour explicitly
   * so future engineers know it is a deliberate decision, not an omission.
   */
  it('succeeds for unauthenticated requests (auth is intentionally out of scope)', async () => {
    const serverWithNoUid = new ApolloServer({
      typeDefs,
      resolvers,
      context: () => ({ uid: null }),
    });
    const { query } = createTestClient(serverWithNoUid);
    const res = await query({ query: HELLO_QUERY });

    expect(res.errors).toBeUndefined();
    expect(res.data.hello).toBe('Hello, I am live');
  });
});
