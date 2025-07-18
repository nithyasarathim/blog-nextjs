'use client'

import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Page=()=>{
  const router=useRouter();
  const {data:session}=useSession();
  const [blogs,setBlogs]=useState([]);

  useEffect(()=>{
    if(!session){
      router.push('/');
    }
    const fetchBlogs=async()=>{
      try{
        const res=await fetch('/api/blog')
        if(!res.ok)throw new Error('Failed to fetch blogs')
        const data=await res.json()
        setBlogs(data)
      }catch(err){
        console.error('Error loading blogs:',err.message)
      }
    }
    fetchBlogs()
  },[])

  return(
    <div className='flex w-full items-center overflow-x-auto'>
      <table className='items-center w-fit m-auto my-10 border'>
        <thead>
          <tr className='font-bold bg-sky-100'>
            <td className='text-center border p-3 px-5'>Image</td>
            <td className='text-center border p-3 px-5'>Title</td>
            <td className='text-center border p-3 px-5'>Author</td>
            <td className='text-center border p-3 px-5'>Edit</td>
            <td className='text-center border p-3 px-5'>Delete</td>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog)=>(
            <tr key={blog._id}>
              <td className='p-2 border'>
                <img 
                  src={blog.imageURL} 
                  alt={blog.title} 
                  className='w-32 h-auto rounded-md object-cover' 
                />
              </td>
              <td className='py-2 text-center px-4 border'>{blog.title}</td>
              <td className='py-2 text-center px-4 border'>{blog.author}</td>
              <td className='py-2 text-center px-4 border'>
                <Link href={`/edit/${blog._id}`} className='bg-green-100 text-green-900 rounded-lg py-1 px-3 hover:bg-green-300 duration-100'>
                  Edit
                </Link>
              </td>
              <td className='py-2 text-center px-4 border'>
                <Link href={`/delete/${blog._id}`} className='bg-red-100 text-red-900 rounded-lg py-1 px-3 hover:bg-red-300 duration-100'>
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Page
