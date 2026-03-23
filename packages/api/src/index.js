const functions = require('firebase-functions');
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { context } = require('./context');

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  introspection: true,
});

let serverStarted = false;

/**
 * Firebase Cloud Function: api
 * Exported name must match the function name in firebase.json ("api").
 * Project ID and region are resolved at deploy time from the Firebase
 * environment — never hardcoded here.
 */
exports.api = functions.https.onRequest(async (req, res) => {
  if (!serverStarted) {
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });
    serverStarted = true;
  }
  return app(req, res);
});
