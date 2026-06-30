import { initializeApp, getApps, getApp, App } from "firebase-admin/app";
import admin from "firebase-admin";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import firebaseConfig from "./firebase-applet-config.json" with { type: "json" };
import { universities } from "./src/data/universities";

let adminApp: App;
try {
  adminApp = initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: firebaseConfig.projectId,
  });
} catch (error) {
  try { adminApp = getApp(); } catch (e) {
    adminApp = initializeApp({ projectId: firebaseConfig.projectId });
  }
}

const db = getFirestore(adminApp, firebaseConfig.firestoreDatabaseId);

async function run() {
  console.log("Forcing update of universities to Firestore...");
  for (const uni of universities) {
    const docRef = db.collection("universities").doc(uni.id);
    console.log(`Updating ${uni.name}...`);
    await docRef.set({
      ...uni,
      updatedAt: FieldValue.serverTimestamp()
    }, { merge: true });
  }
  console.log("Update complete!");
}

run();
