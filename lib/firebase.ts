import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

const firebaseSecondaryConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_SECONDARY_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_SECONDARY_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_SECONDARY_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_SECONDARY_STORAGE_BUCKET!,
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_SECONDARY_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_SECONDARY_APP_ID!,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Optional secondary instance
const secondaryApp = initializeApp(firebaseSecondaryConfig, "secondary");
export const secondaryAuth = getAuth(secondaryApp);
