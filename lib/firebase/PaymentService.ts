import { db } from "@/lib/firebase/firestore"
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  Timestamp,
  query,
  orderBy,
} from "firebase/firestore"

// 🔹 Get all payment requests
export async function getAllPaymentRequests() {
  const q = query(
    collection(db, "paymentRequests"),
    orderBy("createdAt", "desc")
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }))
}

// 🔹 Update payment request status
export async function updatePaymentStatus(
  requestId: string,
  status: "approved" | "rejected"
) {
  const ref = doc(db, "paymentRequests", requestId)

  await updateDoc(ref, {
    status,
    updatedAt: Timestamp.now(),
  })
}
