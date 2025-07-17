'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const Page=({params})=>{
  const router=useRouter()
  const [post,setPost]=useState(null)
  const [error,setError]=useState('')

  useEffect(()=>{
    const fetchPost=async()=>{
      try {
        const res=await fetch(`/api/blog/${params.id}`)
        if (!res.ok){
          throw new Error('Failed to load blog')
        }
        const data=await res.json()
        setPost(data)
      } catch(err){
        setError(err.message)
      }
    }
    fetchPost()
  }, [params.id])

  const handleDelete=async()=>{
    try {
      const res=await fetch(`/api/blog/delete/${params.id}`,{
        method:'DELETE',
      })
      const result=await res.json()
      if (!res.ok){
        throw new Error(result.message)
      }
      router.push('/')
    } catch(err){
      setError(err.message)
      console.error('Failed to delete:', err.message)
    }
  }

  if (!post){
    return <div className="text-center my-10">Loading blog...</div>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">
          Delete blog: <span className="text-red-600">{post.title}</span>?
        </h2>
        <p className="mb-6 text-sm text-gray-600">This action cannot be undone again !.</p>
        {error&&<p className="text-red-600 text-sm mb-4">{error}</p>}
        <div className="flex justify-between">
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel delete
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page
