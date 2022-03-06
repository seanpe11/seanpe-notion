const { getFirestore, collection, addDoc } = require("firebase/firestore")
const { app } = require("./init")

const { Client } = require('@notionhq/client');

const db = getFirestore(app)

(async function() {try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}})

export async function addDeadline(pageId) {

}