import React from 'react'
import {LucideLoader} from "lucide-react";
export default function Loader() {
  return (
    <div className='w-full min-h-screen bg-background h-full! flex items-center justify-center'>
      <LucideLoader className='animate-spin' size={30}/>
    </div>
  )
}
