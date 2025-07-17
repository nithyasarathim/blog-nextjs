
import {connectDB} from '@/app/lib/db'
import Blog from '@/app/models/blog'

export const GET=async(req,{params})=>{
  try{
    await connectDB()
    const blog=await Blog.findById(params.id)
    if(!blog){
        return (
            Response.json(
                {message:'Blog not found'},
                {status:404}
            )
        )
    }
    return Response.json(blog)
  }catch(err){
    return Response.json({
        message:'Server error'+err.message},
        {status:500})
  }
}
