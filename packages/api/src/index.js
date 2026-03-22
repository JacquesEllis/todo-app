// Cloud Function entry point
// Engineer will implement Apollo Server / GraphQL handler here
const functions = require('firebase-functions');

exports.api = functions.region('us-central1').https.onRequest((req, res) => {
  res.json({ status: 'ok', message: 'Hello from api' });
});
