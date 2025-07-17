import { connectDB } from '@/app/lib/db'
import Blog from '@/app/models/blog'

export const DELETE = async (_, { params }) => {
  try {
    await connectDB()
    const deleted = await Blog.findByIdAndDelete(params.id)
    if (!deleted) {
      return (
        Response.json(
            {message:'Blog not found'}, 
            {status:404})
        )
    }

    return (
        Response.json(
            {message:'Blog deleted successfully'},
            {status:200})
        )
  } catch (err) {
    console.error('Error in deleting ',err.message)
    return NextResponse.json({ message:err.message},{status:500})
  }
}
