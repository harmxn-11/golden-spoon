import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore"
import { db } from "@/lib/firebase/firestore"

/* =======================
   TYPES
======================= */

export interface MenuItem {
  id: string
  name: string
  price: number
  available: boolean
}

export interface MenuSection {
  id?: string
  title: string
  items: MenuItem[]
  createdAt: number
}

/* =======================
   COLLECTION REF
======================= */

const menuCollection = collection(db, "menu")

/* =======================
   GET ALL SECTIONS
======================= */
export const getMenuSections = async (): Promise<MenuSection[]> => {
  const q = query(menuCollection, orderBy("createdAt", "asc"))
  const snapshot = await getDocs(q)

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<MenuSection, "id">),
  }))
}

/* =======================
   CREATE SECTION
======================= */
export const createSection = async (title: string) => {
  await addDoc(menuCollection, {
    title,
    items: [],
    createdAt: Date.now(),
  })
}

/* =======================
   DELETE SECTION
======================= */
export const deleteSectionById = async (sectionId: string) => {
  await deleteDoc(doc(db, "menu", sectionId))
}

/* =======================
   ADD ITEM TO SECTION
======================= */
export const addItemToSection = async (
  sectionId: string,
  item: MenuItem
) => {
  const sectionRef = doc(db, "menu", sectionId)

  const snapshot = await getDocs(menuCollection)
  const sectionDoc = snapshot.docs.find((d) => d.id === sectionId)
  if (!sectionDoc) return

  const data = sectionDoc.data() as MenuSection

  await updateDoc(sectionRef, {
    items: [...data.items, item],
  })
}

/* =======================
   TOGGLE ITEM AVAILABILITY
======================= */
export const toggleItemAvailability = async (
  sectionId: string,
  itemId: string
) => {
  const sectionRef = doc(db, "menu", sectionId)

  const snapshot = await getDocs(menuCollection)
  const sectionDoc = snapshot.docs.find((d) => d.id === sectionId)
  if (!sectionDoc) return

  const data = sectionDoc.data() as MenuSection

  const updatedItems = data.items.map((item) =>
    item.id === itemId
      ? { ...item, available: !item.available }
      : item
  )

  await updateDoc(sectionRef, { items: updatedItems })
}

/* =======================
   DELETE ITEM FROM SECTION
======================= */
export const deleteItemFromSection = async (
  sectionId: string,
  itemId: string
) => {
  const sectionRef = doc(db, "menu", sectionId)

  const snapshot = await getDocs(menuCollection)
  const sectionDoc = snapshot.docs.find((d) => d.id === sectionId)
  if (!sectionDoc) return

  const data = sectionDoc.data() as MenuSection

  await updateDoc(sectionRef, {
    items: data.items.filter((item) => item.id !== itemId),
  })
}
