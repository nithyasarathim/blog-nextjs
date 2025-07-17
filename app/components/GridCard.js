'use client'

import React from 'react'
import Link from 'next/link'

const GridCard=({blog})=>{
  return(
    <div className='h-fit m-3 border border-gray-300 p-2 rounded-md shadow-lg hover:border-1 hover:shadow-2xl/40 hover:border-blue-400 duration-150'>
      <Link href={`/blog/${blog._id}`}>
        <div>
          <img src={blog.imageURL} alt={blog.title} className='p-1 sm:h-[150px] md:h-[120px] lg:h-[120px] h-fit w-full object-cover rounded-md md:p-0'/>
          <div className='justify-between flex flex-col mt-2'>
            <p className='font-bold text-base max-h-[70px] min-h-[70px]'>{blog.title}</p>
            <p className='text-sm text-gray-600 px-1 mb-3'>By <span className='font-bold text-sky-500'>{blog.author}</span></p>
          </div>
          <p className='text-xs mt-1 text-gray-500 gap-1 flex'>{blog.tags.map((tag)=>{
            return <span key={tag} className='bg-gray-200 px-2 py-1 rounded-md'>{tag}</span>
          })}</p>
        </div>
      </Link>
    </div>
  )
}

export default GridCard
