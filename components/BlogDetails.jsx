"use client"
const BlogDetails = ({title,data}) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-black text-base">{data.description}</p>
    </div>
  )
}

export default BlogDetails