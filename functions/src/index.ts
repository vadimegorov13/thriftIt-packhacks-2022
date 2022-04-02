import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Create a document for the user when user creates an account
exports.createUserDocuments = functions.auth.user().onCreate(async (user) => {
  const userId = user.uid;
  // Create date
  const date = {
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  // Declare user
  const userData = {
    id: userId,
    username: user.displayName,
    email: user.email,
    photoUrl: user.photoURL,
    ...date,
  };

  // Declare history and favorite
  const votes = {
    votedTo: [],
    ...date,
  };

  await db.collection('users').doc(userId).set(userData);
  await db.collection('snippets').doc(userId);
  await db.collection('votes').doc(userId).set(votes);
});
