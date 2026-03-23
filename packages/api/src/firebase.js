const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp(); // Auto-configured in Cloud Functions environment
}

module.exports = { admin };
