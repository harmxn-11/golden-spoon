import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "./firebase";

const auth = getAuth(app);
export default auth;

export const signupUser = async (
  email: string,
  password: string,
  name: string
) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(res.user, { displayName: name });
  return res.user;
};

export const loginUser = async (email: string, password: string) => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res.user;
};

export const logoutUser = async () => {
  await signOut(auth);
};
