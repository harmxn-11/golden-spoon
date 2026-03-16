import { User } from "@/types/User";
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { db } from "@/lib/firebase";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
export async function createUser(user: User,role: string="USER") {
  const { email, password, ...restData } = user;
  const newUser = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, "users", newUser.user.uid), { ...restData, email,role });
  return newUser.user.uid;
}

export async function updateUser(user: User) {}

export async function signInUser(email: string, password: string) {
  await signInWithEmailAndPassword(auth, email, password);
}

export async function getUser(id: string) {
  const data = await getDoc(doc(db, "users", id));
  return { id: data.id, ...data.data() };
}

export async function logOutUser(){
  await signOut(auth);
}