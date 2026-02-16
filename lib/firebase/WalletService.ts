import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";

export const getChefBalance = async (chefId: string) => {
  const q = query(
    collection(db, "chefBalances"),
    where("chefId", "==", chefId)
  );
  const snap = await getDocs(q);
  return snap.docs.reduce((sum, d) => sum + d.data().amount, 0);
};

export const requestWithdrawal = async (
  chefId: string,
  amount: number,
  bankDetails: any
) => {
  await addDoc(collection(db, "withdrawRequests"), {
    chefId,
    amount,
    bankDetails,
    status: "pending",
    createdAt: new Date(),
  });
};
