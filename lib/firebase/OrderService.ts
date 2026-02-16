import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";

export const placeOrder = async (data: {
  userId: string;
  items: any[];
  total: number;
  orderType: "dine-in" | "takeaway";
}) => {
  await addDoc(collection(db, "orders"), {
    ...data,
    status: "pending",
    createdAt: new Date(),
  });
};

export const getUserOrders = async (userId: string) => {
  const q = query(collection(db, "orders"), where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
