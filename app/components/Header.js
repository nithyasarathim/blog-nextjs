'use client'

import React,{useState} from 'react'
import Link from 'next/link'
import {Menu,X} from 'lucide-react'
import {useSession,signIn,signOut} from 'next-auth/react'
import {useRouter} from 'next/navigation'

const Header=()=>{
  const router=useRouter()
  const {data:session}=useSession()
  const [isMobileMenuOpen,setIsMobileMenuOpen]=useState(false)
  let isAdmin=false
  if(session){
    isAdmin=true;
  }
  return(
    <div className='border-b py-3 px-5 md:px-40 flex flex-col md:flex-row md:justify-between md:items-center'>
      <div className='flex w-full justify-between items-center'>
        <div className='mx-5'>
          <h1 className='text-2xl bg-sky-500 text-white py-1 px-3 rounded-md font-[bahnschrift]'>DevNotes</h1>
        </div>
      {session&&<p className='mx-10'>Welcome <span className='font-bold mx-3' onClick={()=>{router.push('/profile')}}>{session?.user?.name} !</span></p>}
        <div className='md:hidden'>
          <button onClick={()=>setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen?<X />:<Menu />}
          </button>
        </div>
      </div>
      <div className={`gap-5 px-3 items-center ${isMobileMenuOpen?'flex flex-col mt-5':'hidden'} md:flex md:flex-row md:gap-10`}>
        <Link href="/">Home</Link>
        {isAdmin&&(
          <>
            <Link href="/create">Add</Link>
            <Link href="/dashboard">Dashboard</Link>
          </>
        )}
        {!session&&(
          <button onClick={()=>signIn('github')} className='text-sm font-semibold'>Login</button>
        )}
        {session&&(
          <button onClick={()=>{signOut();isAdmin=false}} className='text-sm font-semibold'>Logout</button>
        )}
      </div>
    </div>
  )
}

export default Header
