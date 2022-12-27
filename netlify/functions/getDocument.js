const {firestore} = require('./bot/firebase.js');

const handler = async (event) => {
  try {
    const payload = JSON.parse(event.body);
    const docRef = firestore.collection(payload.docPath).doc(payload.docId);
    const docSnap = await docRef.get();

    return {
      statusCode: 200,
      body: JSON.stringify({...docSnap.data(), docId: docSnap.id})
    };
  } catch (e) {
    return {statusCode: 400, body: 'Document not found'};
  }
};

module.exports = {handler};