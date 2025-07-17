import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  tags: [String],
  imageURL: String
}, {timestamps: true})

export default mongoose.models.Blog||mongoose.model('Blog',blogSchema)
