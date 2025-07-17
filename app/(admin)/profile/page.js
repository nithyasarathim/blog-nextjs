'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

const Page = () => {
    const {data:session} = useSession();
    if(!session){
        return (
            <div className='flex h-[80vh] w-full'>
                <div className='m-auto flex flex-col items-center justify-center gap-5 p-10 bg-sky-50 border rounded-lg shadow-lg'>
                    <p className='text-xl font-bold'>Please log in to view your profile.</p>
                </div>
            </div>
        )
    }
  return (
    <div className='flex h-[80vh] w-full'>
        <div className='m-auto flex flex-col items-center justify-center gap-5 p-10 bg-sky-50 border rounded-lg shadow-lg'>
            <img src={session?.user?.image} height={250} width={250} className='rounded-full'/>
            <p className='m-auto font-bold text-3xl'>{session?.user?.name}</p>
            <p>{session?.user?.email}</p>
        </div>
    </div>
  )
}

export default Page