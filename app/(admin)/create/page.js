'use client'

import React,{useState} from 'react'
import {useRouter} from 'next/navigation'
import UnsupportedImg from '@/public/unsupportedImg.png'

const Page=()=>{
  const router=useRouter()
  const [title,setTitle]=useState('')
  const [author,setAuthor]=useState('')
  const [tags,setTags]=useState([])
  const [imageURL,setImageURL]=useState('')
  const [content,setContent]=useState('')

  const handleSubmit=async(e)=>{
    e.preventDefault()
    
    const blog={title,author,tags,imageURL,content}

    try{
      const res=await fetch('/api/blog/create',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(blog)
      })

      const result=await res.json()

      if(!res.ok){
        console.error('Failed to create blog');
        console.log('Error details:',result.message);
        return
      }
      router.push('/')

    }catch(err){
      console.error('Error in creating blog',err.message);
    }
  }

  return(
    <div className='max-w-[700px] m-auto my-10 px-3'>
      <h1 className='text-xl sm:text-2xl font-bold mb-5 text-center'>Create New Blog Post</h1>
      {
        imageURL&&
        <img 
          src={imageURL} 
          alt='preview' 
          onError={(e)=>e.currentTarget.src=UnsupportedImg.src} 
          className='w-[650px] max-h-[300px] object-cover rounded-md border mx-2'
        />
      }
      <form onSubmit={handleSubmit} className='bg-white shadow-md rounded-lg p-5 flex flex-col gap-5'>
        <div>
          <label className='block mb-1 font-semibold'>Blog Title</label>
          <input value={title} onChange={(e)=>setTitle(e.target.value)} className='w-full border px-3 py-2 rounded-md text-sm sm:text-base'/>
        </div>
        <div>
          <label className='block mb-1 font-semibold'>Author</label>
          <input value={author} onChange={(e)=>setAuthor(e.target.value)} className='w-full border px-3 py-2 rounded-md text-sm sm:text-base'/>
        </div>
        <div>
          <label className='block mb-1 font-semibold'>Tags (comma separated)</label>
          <input value={tags.join(',')} onChange={(e)=>setTags(e.target.value.split(','))} className='w-full border px-3 py-2 rounded-md text-sm sm:text-base'/>
        </div>
        <div>
          <label className='block mb-1 font-semibold'>Image URL</label>
          <input value={imageURL} onChange={(e)=>setImageURL(e.target.value)} className='w-full border px-3 py-2 rounded-md text-sm sm:text-base' placeholder='https://...'/>
        </div>
        <div>
          <label className='block mb-1 font-semibold'>Content</label>
          <textarea value={content} onChange={(e)=>setContent(e.target.value)} rows={8} className='w-full border px-3 py-2 rounded-md text-sm sm:text-base'></textarea>
        </div>
        <button type='submit' className='bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 text-sm sm:text-base'>Post Blog</button>
      </form>
    </div>
  )
}

export default Page
