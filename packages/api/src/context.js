/**
 * Auth context middleware.
 *
 * Authentication is out of scope for the Hello World task — this module
 * is scaffolded here so that future resolvers can rely on context.uid
 * without any changes to index.js.
 *
 * For now every request receives { uid: null }.
 */
async function context({ req }) { // eslint-disable-line no-unused-vars
  return { uid: null };
}

module.exports = { context };
