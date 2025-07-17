import { connectDB } from '@/app/lib/db'
import Blog from '@/app/models/blog'

export const PUT=async(req,{params})=>{
  try {
    await connectDB();
    const body=await req.json();
    const {title,author,tags,imageURL,content}=body;
    const updatedBlog=await Blog.findByIdAndUpdate(params.id,{title,author,tags,imageURL,content},{new:true});
    if (!updatedBlog) {
      return(
        Response.json(
            {message:'Blog not found'},
            {status:404}
        )
     )
    }
    return(
      Response.json(
        {message:'Blog updated successfully',blog:updatedBlog},
        {status:200}
      )
    )
  }catch (err) {
    console.error('Update Error:',err.message)
    return (
        Response.json(
            {message:'Server error:'+err.message},
            {status:500}
        )
    )
  }
}
