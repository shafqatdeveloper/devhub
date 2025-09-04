"use client"
import { AuthAPI } from '@/app/services/authServices';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

const Posts = () => {
  const router = useRouter()
  const handleLogout = async()=>{
   const confirmLogout = confirm("Are you sure you want to Logout")
   if(confirmLogout){
     try {
      const {data} = await AuthAPI.logout()
      toast.success(data?.message || "Logged Out")
      router.push("/login")
    } catch (error) {
         const msg =
                error?.details?.error || error?.message || "Something went wrong";
            toast.error(String(msg));
    }
   }
  }
  return (
    <div>
      <button onClick={handleLogout} className='absolute cursor-pointer right-5 top-5 bg-primaryLight text-textWhite p-2 w-32 rounded-md text-lg font-medium'>
        Logout
      </button>
    </div>
  )
}

export default Posts