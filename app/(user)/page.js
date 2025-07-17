'use client'

import React,{useEffect,useState} from 'react'
import GridCard from '@/app/components/GridCard'
import Loading from '../loading'

const Page=()=>{
  const [blogs,setBlogs]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    const fetchBlogs=async()=>{
      try{
        const res=await fetch('/api/blog')
        if(!res.ok)throw new Error('Failed to fetch blogs')
        const data=await res.json()
        setBlogs(data)
        setLoading(false)
      }catch(err){
        console.error(err)
        setLoading(false)
      }
    }
    fetchBlogs()
  },[])

  if(loading){
    return <Loading/>
  }

  return(
    <div>
      <h1 className='my-10 font-bold text-xl md:mx-43'>Explore developer stories!</h1>
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 xl:mx-40'>
        {
          blogs.map((blog)=>(
            <div key={blog._id} className='cols-span-1'>
              <GridCard blog={blog}/>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Page
