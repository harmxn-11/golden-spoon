import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  deleteDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { userStore } from "@/store/UserInfoStore";
import { ERROR_MESSAGE, getRandomString } from "@/lib/constants";
const MENU = "menus";

export async function getMenu() {
  const restrauntId = userStore.getState().user?.restraunt_id;
  if (restrauntId) {
    const snaps = await getDocs(collection(db, MENU));
    return snaps.docs
      .map((snap) => {
        return { id: snap.id, ...snap.data() };
      })
      .filter((snap: any) => {
        return snap.restrauntId === restrauntId;
      });
  }
  return [];
}

export async function getMenuById(restrauntId: string) {
  try {
    const snaps = await getDocs(collection(db, MENU));
    return snaps.docs
      .map((snap) => {
        return { id: snap.id, ...snap.data() };
      })
      .filter((snap: any) => {
        return snap.restrauntId === restrauntId;
      });
  } catch {
  }
}

export async function getMenuItemsBySection(sectionId: string) {
  try {
    const docRef = doc(db, MENU, sectionId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const snapData = snap.data();
      return { id: snap.id, ...snapData };
    }
    return {};
  } catch {
    throw Error(ERROR_MESSAGE);
  }
}

export async function createMenuSection(name: string) {
  try {
    const restrauntId = userStore.getState().user?.restraunt_id;
    if (restrauntId) {
      const createdDoc = await addDoc(collection(db, MENU), {
        title: name,
        items: [],
        restrauntId,
      });
      return createdDoc.id;
    }
  } catch {
    throw Error(ERROR_MESSAGE);
  }
}

export async function deleteMenuSection(id: string) {
  try {
    await deleteDoc(doc(db, MENU, id));
    return {};
  } catch {
    throw Error(ERROR_MESSAGE);
  }
}

export async function createMenuItem(
  name: string,
  price: number,
  sectionId: string
) {
  try {
    const id = getRandomString();
    await updateDoc(doc(db, MENU, sectionId), {
      items: arrayUnion({ id, name, price, available: true }),
    });
    return id;
  } catch {
    throw Error(ERROR_MESSAGE);
  }
}

export async function deleteMenuItem(id: string, sectionId: string) {
  try {
    const docRef = doc(db, MENU, sectionId);
    const section = await getDoc(docRef);
    if (section.exists()) {
      const sectionInfo = section.data();
      const updatedItems = sectionInfo?.items.filter(
        (item: any) => item.id !== id
      );
      updateDoc(docRef, {
        items: updatedItems,
      });
    }
    return {};
  } catch {
    throw Error(ERROR_MESSAGE);
  }
}

export async function toggleMenuItemStatus(id: string, sectionId: string) {
  try {
    const docRef = doc(db, MENU, sectionId);
    const section = await getDoc(docRef);
    if (section.exists()) {
      const sectionData = section.data();
      const updatedItems = sectionData.items.map((item: any) => {
        if (item.id === id) {
          return { ...item, available: !item.available };
        }
        return { ...item };
      });
      await updateDoc(docRef, {
        items: updatedItems,
      });
    }
  } catch {
    throw Error(ERROR_MESSAGE);
  }
}
