"use client"

import { useEffect, useState } from "react"
import auth from "../lib/firebase/firebaseAuth"
import { onAuthStateChanged, User } from "firebase/auth"
import Loader from "./Loader"

const AuthWrapper = ({children}:React.PropsWithChildren) => {
//   const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
        console.log(currentUser);
        //   setUser(currentUser)
      setLoading(false)
    })

    return () => unsub()
  }, [])

  return (loading ? <Loader/>:children)
}
export default AuthWrapper;