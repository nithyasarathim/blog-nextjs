import { connectDB } from '@/app/lib/db'
import Blog from '@/app/models/blog'

export const GET = async () => {
  try {
    await connectDB()
    const blogs = await Blog.find().sort({ createdAt:-1})
    return(
        Response.json(
            blogs,
            {status:200}
        )
    )
  } catch (err) {
    console.error(err.message)
    return(
        Response.json(
            {message:'Server error:'+err.message},
            {status:500}
        )
    )
  }
}
