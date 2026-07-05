import { initializeApp, getApps } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey:            "AIzaSyCVxjNKmd4q0MSqMSAHVBZKL6gKxm-FkjQ",
  authDomain:        "uno-travel-76fff.firebaseapp.com",
  projectId:         "uno-travel-76fff",
  storageBucket:     "uno-travel-76fff.firebasestorage.app",
  messagingSenderId: "844479496061",
  appId:             "1:844479496061:web:bf5996033433c9a9895614",
  measurementId:     "G-X5E4H5Z67N",
};

// VAPID key — get from Firebase Console → Project Settings → Cloud Messaging → Web Push certificates
const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY || "";

let _app;
if (typeof window !== "undefined") {
  _app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
}

/**
 * Request notification permission and return the FCM token.
 * Returns null if not supported, permission denied, or missing VAPID key.
 */
export const requestFCMToken = async () => {
  if (typeof window === "undefined") return null;
  try {
    const supported = await isSupported();
    if (!supported) return null;

    const permission = await Notification.requestPermission();
    if (permission !== "granted") return null;

    const messaging = getMessaging(_app);
    const token = await getToken(messaging, { vapidKey: VAPID_KEY });
    return token || null;
  } catch {
    return null;
  }
};
