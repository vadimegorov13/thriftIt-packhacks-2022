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
exports.createUserDocument = functions.auth.user().onCreate(async (user) => {
  const userId = user.uid;
  // Declare user
  const userData = {
    id: userId,
    username: user.displayName,
    email: user.email,
    photoUrl: user.photoURL,
    about: '',
    joinedAt: Date.now(),
  };

  await db.collection('users').doc(userId).set(userData);
  const contacts = await db
    .collection('users')
    .doc(userId)
    .collection('contacts')
    .doc();

  await db
    .collection('users')
    .doc(userId)
    .collection('contacts')
    .doc(contacts.id)
    .set({});
});
