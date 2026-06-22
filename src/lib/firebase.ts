import { getApp, getApps, initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export function isFirebaseConfigured() {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId && firebaseConfig.appId);
}

export async function createProjectBrief(payload: Record<string, unknown>) {
  if (!isFirebaseConfigured()) {
    throw new Error("Project brief storage is not configured yet. Please contact hello@vish.studio.");
  }

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  const database = getFirestore(app);
  const document = await addDoc(collection(database, "briefs"), {
    ...payload,
    status: "new",
    source: "vish.studio/start-project",
    createdAt: serverTimestamp(),
    submittedAt: new Date().toISOString(),
  });

  return document.id;
}
