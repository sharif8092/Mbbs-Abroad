import express from "express";
import { createServer as createViteServer } from "vite";
import { initializeApp, getApps, getApp, App } from "firebase-admin/app";
import admin from "firebase-admin";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import firebaseConfig from "./firebase-applet-config.json";

dotenv.config();

let adminApp: App;
// Initialize Firebase Admin
try {
  if (getApps().length === 0) {
    adminApp = initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: firebaseConfig.projectId,
    });
    console.log("Firebase Admin initialized successfully");
  } else {
    adminApp = getApp();
    console.log("Firebase Admin already initialized, using existing instance");
  }
} catch (error) {
  console.error("Firebase Admin initialization error:", error);
  try {
    adminApp = getApp();
  } catch (appErr) {
    console.error("Failed to get existing app, initializing without explicit credential:", appErr);
    adminApp = initializeApp({
      projectId: firebaseConfig.projectId,
    });
  }
}

const db = getFirestore(adminApp, firebaseConfig.firestoreDatabaseId);

import { universities as initialUnis } from "./src/data/universities";
import { blogPosts as initialBlogs } from "./src/data/blogs";

async function seedIfEmpty() {
  try {
    console.log("Syncing universities to Firestore...");
    for (const uni of initialUnis) {
      const docRef = db.collection("universities").doc(uni.id);
      const docSnap = await docRef.get();
      if (!docSnap.exists) {
        console.log(`Adding missing university: ${uni.name}`);
        await docRef.set({
          ...uni,
          createdAt: FieldValue.serverTimestamp()
        });
      }
    }

    console.log("Syncing blogs to Firestore...");
    for (const blog of initialBlogs) {
      const docRef = db.collection("blogs").doc(blog.id);
      const docSnap = await docRef.get();
      if (!docSnap.exists) {
        console.log(`Adding missing blog: ${blog.title}`);
        await docRef.set({
          ...blog,
          createdAt: FieldValue.serverTimestamp()
        });
      }
    }
  } catch (error) {
    console.error("Auto-seed/sync error:", error);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      db: "firebase",
      env: process.env.NODE_ENV || 'development'
    });
  });

  // Applications/Enquiries
  app.post("/api/applications", async (req, res) => {
    try {
      const enquiry = {
        ...req.body,
        status: 'Pending',
        createdAt: FieldValue.serverTimestamp()
      };
      const docRef = await db.collection("enquiries").add(enquiry);
      res.status(201).json({ success: true, message: "Application submitted", id: docRef.id });
    } catch (error) {
      console.error('Enquiry error:', error);
      res.status(500).json({ success: false, error: "Failed to submit enquiry" });
    }
  });

  app.get("/api/admin/applications", async (req, res) => {
    try {
      const snapshot = await db.collection("enquiries").orderBy("createdAt", "desc").get();
      const docs = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          _id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || data.createdAt
        };
      });
      res.json(docs);
    } catch (error) {
      console.error('Admin fetch error:', error);
      res.status(500).json({ success: false, error: "Failed to fetch enquiries" });
    }
  });

  app.patch("/api/admin/applications/:id", async (req, res) => {
    try {
      const { status } = req.body;
      await db.collection("enquiries").doc(req.params.id).update({ status, updatedAt: FieldValue.serverTimestamp() });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to update enquiry" });
    }
  });

  // Universities CRUD
  app.get("/api/universities", async (req, res) => {
    try {
      res.json(initialUnis);
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch universities" });
    }
  });

  app.post("/api/universities", async (req, res) => {
    try {
      const docRef = await db.collection("universities").add({
        ...req.body,
        createdAt: FieldValue.serverTimestamp()
      });
      res.status(201).json({ success: true, id: docRef.id });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to create university" });
    }
  });

  app.patch("/api/universities/:id", async (req, res) => {
    try {
      await db.collection("universities").doc(req.params.id).update({
        ...req.body,
        updatedAt: FieldValue.serverTimestamp()
      });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to update university" });
    }
  });

  app.delete("/api/universities/:id", async (req, res) => {
    try {
      await db.collection("universities").doc(req.params.id).delete();
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to delete university" });
    }
  });

  // Blogs CRUD
  app.get("/api/blogs", async (req, res) => {
    try {
      const snapshot = await db.collection("blogs").orderBy("createdAt", "desc").get();
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json(docs);
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch blogs" });
    }
  });

  app.post("/api/blogs", async (req, res) => {
    try {
      const docRef = await db.collection("blogs").add({
        ...req.body,
        createdAt: FieldValue.serverTimestamp()
      });
      res.status(201).json({ success: true, id: docRef.id });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to create blog" });
    }
  });

  // Gallery CRUD
  app.get("/api/gallery", async (req, res) => {
    try {
      const snapshot = await db.collection("gallery").orderBy("createdAt", "desc").get();
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json(docs);
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch gallery" });
    }
  });

  app.post("/api/gallery", async (req, res) => {
    try {
      const docRef = await db.collection("gallery").add({
        ...req.body,
        createdAt: FieldValue.serverTimestamp()
      });
      res.status(201).json({ success: true, id: docRef.id });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to add to gallery" });
    }
  });

  app.delete("/api/gallery/:id", async (req, res) => {
    try {
      await db.collection("gallery").doc(req.params.id).delete();
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to delete from gallery" });
    }
  });

  // Catch-all for /api
  app.all("/api/*", (req, res) => {
    res.status(404).json({ error: `API endpoint ${req.method} ${req.url} not found` });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
    seedIfEmpty().catch(err => {
      console.error("Delayed background seeding failed:", err);
    });
  });
}

startServer();
