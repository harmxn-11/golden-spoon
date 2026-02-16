import {
  doc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";

export const getAvailableOrders = async () => {
  const q = query(collection(db, "orders"), where("status", "==", "pending"));
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const acceptOrder = async (
  orderId: string,
  chefId: string,
  pay: number
) => {
  await updateDoc(doc(db, "orders", orderId), {
    status: "accepted",
    chefId,
  });

  await addDoc(collection(db, "chefBalances"), {
    chefId,
    amount: pay,
    createdAt: new Date(),
  });
};

export const rejectOrder = async (orderId: string) => {
  await updateDoc(doc(db, "orders", orderId), {
    status: "rejected",
  });
};
