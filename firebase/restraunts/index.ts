import { Restaurant } from "@/types/Restraunt";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { updateUser } from "../Users";
export async function createRestraunt(data: Restaurant,userId: string){
    await setDoc(doc(db,"restraunts",userId),data);
    await updateUser({restraunt_id: userId} as any,userId);
}
 
export async function getRestraunt(id: string){
    const restraunt = await getDoc(doc(db,"restraunts",id));
    return {id: restraunt.id,...restraunt.data()}
}