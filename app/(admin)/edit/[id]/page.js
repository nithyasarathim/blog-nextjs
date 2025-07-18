'use client'

import React,{useEffect,useState} from 'react'
import {useRouter} from 'next/navigation'

const Page=({params})=>{
  const router=useRouter()
  const [title,setTitle]=useState('')
  const [author,setAuthor]=useState('')
  const [tags,setTags]=useState([])
  const [imageURL,setImageURL]=useState('')
  const [content,setContent]=useState('')
  const [error,setError]=useState('')

  useEffect(()=>{
    const fetchBlog=async()=>{
      try{
        const res=await fetch(`/api/blog/${params.id}`)
        if(!res.ok)throw new Error('Failed to fetch blog')
        const data=await res.json()
        setTitle(data.title)
        setAuthor(data.author)
        setTags(data.tags)
        setImageURL(data.imageURL)
        setContent(data.content)
      }catch(err){
        setError(err.message)
        console.error(err.message)
      }
    }
    fetchBlog()
  },[params.id])

  const handleUpdate=async(e)=>{
    e.preventDefault()
    setError('')
    try{
      const res=await fetch(`/api/blog/update/${params.id}`,{
        method:'PUT',
        body:JSON.stringify({title,author,tags,imageURL,content})
      })
      const result=await res.json()
      if(!res.ok){
        throw new Error(result.message)
      }
      router.push('/')
    }catch(err){
      setError(err.message)
      console.error('Failed to update the blog', err.message)
    }
  }
  return(
    <div className='max-w-[700px] m-auto my-10 px-3'>
      <h1 className='text-xl sm:text-2xl font-bold mb-5 text-center'>Edit Blog Post</h1>
      {error && <p className='text-red-600 mb-4 font-semibold text-center'>{error}</p>}
      <form onSubmit={handleUpdate} className='bg-white shadow-md rounded-lg p-5 flex flex-col gap-5'>
        <div>
          <label className='block mb-1 font-semibold'>Blog Title</label>
          <input value={title} onChange={(e)=>setTitle(e.target.value)} className='w-full border px-3 py-2 rounded-md'/>
        </div>
        <div>
          <label className='block mb-1 font-semibold'>Author</label>
          <input value={author} onChange={(e)=>setAuthor(e.target.value)} className='w-full border px-3 py-2 rounded-md'/>
        </div>
        <div>
          <label className='block mb-1 font-semibold'>Tags (comma separated)</label>
          <input value={tags.join(',')} onChange={(e)=>setTags(e.target.value.split(','))} className='w-full border px-3 py-2 rounded-md'/>
        </div>
        <div>
          <label className='block mb-1 font-semibold'>Image URL</label>
          <input value={imageURL} onChange={(e)=>setImageURL(e.target.value)} className='w-full border px-3 py-2 rounded-md'/>
        </div>
        <div>
          <label className='block mb-1 font-semibold'>Content</label>
          <textarea value={content} onChange={(e)=>setContent(e.target.value)} rows={8} className='w-full border px-3 py-2 rounded-md'></textarea>
        </div>
        <button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'>Update Blog</button>
      </form>
    </div>
  )
}

export default Page
