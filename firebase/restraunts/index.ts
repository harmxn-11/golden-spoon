import { Restaurant } from "@/types/Restraunt";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
export async function createRestraunt(data: Restaurant,userId: string){
    await setDoc(doc(db,"restraunts",userId),data);
}