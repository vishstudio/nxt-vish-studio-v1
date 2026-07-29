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

export async function createCallBooking(payload: Record<string, unknown>) {
  if (!isFirebaseConfigured()) {
    throw new Error("Call booking storage is not configured yet. Please contact hello@vish.studio.");
  }

  const selectedDate = String(payload.selectedDate ?? "");
  const selectedTime = String(payload.selectedTime ?? "");
  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const company = String(payload.company ?? "").trim();
  const [hour = "0", minute = "0"] = selectedTime.split(":");
  const startDate = new Date(`${selectedDate}T${hour.padStart(2, "0")}:${minute.padStart(2, "0")}:00+04:00`);
  const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  const database = getFirestore(app);
  const document = await addDoc(collection(database, "bookings"), {
    name,
    email,
    company,
    selectedDate,
    selectedTime,
    startAt: startDate,
    endAt: endDate,
    durationMinutes: 30,
    timezone: "Indian/Mauritius",
    status: "pending",
    source: "vish.studio/book-call",
    hostEmail: "vishstudio.ltd@gmail.com",
    publicEmail: "hello@vish.studio",
    meetLink: "",
    calendarEventId: "",
    notes: "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    submittedAt: new Date().toISOString(),
  });

  return document.id;
}
