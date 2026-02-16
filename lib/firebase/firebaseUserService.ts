import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";

export const createUserProfile = async (
  uid: string,
  data: {
    role: "admin" | "chef" | "user";
    phone?: string;
  }
) => {
  await setDoc(doc(db, "users", uid), {
    ...data,
    createdAt: new Date(),
  });
};

export const getUserProfile = async (uid: string) => {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
};

export const updateUserProfile = async (uid: string, data: any) => {
  await updateDoc(doc(db, "users", uid), data);
};
