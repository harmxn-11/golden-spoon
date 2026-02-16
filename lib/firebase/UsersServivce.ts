import auth from "@/lib/firebase/firebaseAuth"
import  {db} from "@/lib/firebase/firestore"
import {
  createUserWithEmailAndPassword,
} from "firebase/auth"
import {
  collection,
  getDocs,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore"

// 🔹 Get all users
export async function getAllUsers() {
  const snapshot = await getDocs(collection(db, "users"))
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }))
}

// 🔹 Create new user (Admin only)
export async function createNewUser({
  email,
  password,
  role,
  phone,
}: {
  email: string
  password: string
  role: "admin" | "chef" | "user"
  phone?: string
}) {
  const cred = await createUserWithEmailAndPassword(auth, email, password)

  await setDoc(doc(db, "users", cred.user.uid), {
    email,
    role,
    phone: phone || "",
    createdAt: Timestamp.now(),
  })

  return cred.user
}
