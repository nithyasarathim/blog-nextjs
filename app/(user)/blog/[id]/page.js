'use client'

import React,{useEffect,useState} from 'react'
import Loading from '@/app/loading'

const Page=({params})=>{
  const [post,setPost]=useState(null)
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    const fetchPost=async()=>{
      try{
        const res=await fetch(`/api/blog/${params.id}`)
        if(!res.ok){
          throw new Error('Failed to fetch blog')
        }
        const data=await res.json()
        setPost(data)
        setLoading(false)
      }catch(err){
        console.error(err.message)
        setLoading(false)
      }
    }
    fetchPost()
  },[params.id])

  if(loading){
    return <Loading />
  }

  if(!post){
    return <div className='text-center my-10 text-[50px] text-gray-500 font-[calibri] mt-[15%]'>404 Blog not found</div>
  }

  return(
    <div className='flex flex-col items-center justify-center my-10 px-4 sm:px-8 md:px-16'>
      <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-5 text-center'>{post.title}</h1>
      <div className='w-full lg:w-[90vw] align-center flex flex-col lg:flex-row gap-10 lg:gap-20 mt-10'>
        <div className='w-full lg:w-[500px] p-3 h-fit rounded-lg border hover:p-1 duration-100'>
          <img 
            src={post.imageURL} 
            className='w-full h-auto object-cover rounded-lg' 
            alt={post.title}
          />
        </div>
        <div className='w-full lg:w-1/2'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
            <h2 className='text-xl sm:text-2xl md:text-3xl font-semibold mt-3'>By {post.author}</h2>
            <div className='flex flex-col sm:flex-row items-start sm:items-center mx-auto md:mx-0 mt-4 gap-4 sm:gap-10'>
            </div>
          </div>
          <div className='flex flex-wrap gap-2 mt-5'>
            {post.tags.map((tag,index)=>(
              <span key={index} className='px-3 py-1 bg-sky-100 text-sky-800 text-sm rounded-full font-semibold'>
                {tag}
              </span>
            ))}
          </div>
          <h3 className='text-lg sm:text-xl font-semibold my-7'>Blog Content:</h3>
          <p className='text-sm sm:text-lg whitespace-pre-line'>{post.content}</p>
        </div>
      </div>
    </div>
  )
}

export default Page
