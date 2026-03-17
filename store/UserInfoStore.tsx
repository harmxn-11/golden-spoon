import React from "react";
import { create } from "zustand";
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  restraunt_id: string;
}
interface UserStoreStructure {
  user: null | User;
  loginUser: (user: User) => void;
  resetUser: () => void;
}

export const userStore = create<UserStoreStructure>((set) => ({
  user: null,
  loginUser: (user: User) => {
    set({ user: user });
  },
  resetUser: () => {
    set({ user: null });
  },
}));
