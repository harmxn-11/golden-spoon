import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";

export const getAllChefs = async () => {
  const snap = await getDocs(collection(db, "chefs"));
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const setChefPayPerOrder = async (
  chefId: string,
  amount: number
) => {
  await addDoc(collection(db, "chefPayments"), {
    chefId,
    amount,
    updatedAt: new Date(),
  });
};
