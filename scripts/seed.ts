import admin from "firebase-admin";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { universities } from "../src/data/universities";
import { blogPosts } from "../src/data/blogs";
import firebaseConfig from "../firebase-applet-config.json";

// Initialize Firebase Admin
const adminApp = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: firebaseConfig.projectId,
});

const db = getFirestore(adminApp, firebaseConfig.firestoreDatabaseId);

async function seed() {
  console.log("Seeding universities...");
  for (const uni of universities) {
    await db.collection("universities").doc(uni.id).set({
      ...uni,
      createdAt: FieldValue.serverTimestamp()
    });
    console.log(`- Seeded ${uni.name}`);
  }

  console.log("Seeding blogs...");
  for (const blog of blogPosts) {
    await db.collection("blogs").doc(blog.id).set({
      ...blog,
      createdAt: FieldValue.serverTimestamp()
    });
    console.log(`- Seeded ${blog.title}`);
  }

  console.log("Seed complete!");
  process.exit();
}

seed().catch(err => {
  console.error("Seed failed:", err);
  process.exit(1);
});
