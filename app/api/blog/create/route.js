import { connectDB } from '@/app/lib/db'
import Blog from '@/app/models/blog'

export const POST=async(req) => {
  try {
    await connectDB()
    const body=await req.json()
    const {title,author,tags,imageURL,content}=body

    if (!title||!author||!content) {
      return (
        Response.json(
            {message:'Title, author, and content are required'},
            {status:400}
        )
      )
    }

    const newBlog = new Blog({
      title,
      author,
      tags,
      imageURL,
      content
    })

    await newBlog.save()

    return (
        Response.json(
            { message:'Blog created successfully',blog:newBlog },
            { status:201}
          )
        )
  } catch(err){
    console.error('Error occured',err.message)
    return (
        Response.json(
            {message:"Server error:"+err.message},
            {status:500 }
        )
    )
  }
}
